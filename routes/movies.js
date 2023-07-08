const router = require('express').Router();
const { getSavedMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validate');

router.get('/movies', getSavedMovies);

router.post('/movies', validateMovie, addMovie);

router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
