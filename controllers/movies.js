const BadRequestError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const movieModel = require('../models/movie');

const getSavedMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { _id } = req.user;

    const movie = await movieModel.findById(movieId).populate('owner');
    if (!movie) {
      throw new NotFoundError('Фильм с таким id не существует');
    }

    const owner = movie.owner.id;
    if (owner !== _id) {
      throw new ForbiddenError('Можно удалить только свой фильм');
    }

    await movieModel.findByIdAndRemove(movieId);
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getSavedMovies,
  addMovie,
  deleteMovie,
};
