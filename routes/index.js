const { errorLogger } = require('express-winston');
const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const { requestLogger } = require('../middlewares/logger');
const { validateUser, validateAuth } = require('../middlewares/validate');
const limiter = require('../middlewares/rate-limiter');

router.use(limiter);
router.use(requestLogger);
router.use('/signup', validateUser, createUser);
router.use('/signin', validateAuth, login);
router.use(auth);
router.use('/', userRouter);
router.use('/', moviesRouter);
router.use('*', () => {
  throw new NotFoundError('Некорректный путь');
});
router.use(errorLogger);

module.exports = router;
