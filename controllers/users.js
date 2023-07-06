const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const AlreadyExistsError = require('../errors/already-exists-err');
const AuthError = require('../errors/auth-err');
const { JWT_SECRET, NODE_ENV } = require('../utils/constants');

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findById(_id);
    if (!user) {
      throw new NotFoundError('Пользователя с данным id не существует');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('Пользователя с данным id не существует');
    }
    res.send(updateUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        email, password: hash, name,
      })
        .then(() => {
          res.status(201).send({
            email, password, name,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new AlreadyExistsError('Пользователь с данным email уже существует'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
            return;
          }

          next(err);
        });
    });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '90d' });
    if (!token) {
      throw new AuthError('Неправильные почта или пароль');
    }
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  updateUser,
  login,
  createUser,
};
