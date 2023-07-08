const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validate');

router.get('/users/me', getUser);

router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
