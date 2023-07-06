const router = require('express').Router();
const { getSavedMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getSavedMovies);

router.post('/movies', addMovie);

router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
