const URL_REGEX = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+[.]{1,}[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+/i;
const { DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT = 3000 } = process.env;
const SERVER_ERR = 500;
const BAD_REQ = 400;
const NOTFOUND_ERR = 404;
const ALREADY_EXISTS = 409;
const AUTH_ERR = 401;
const FORBIDDEN_ERR = 403;

module.exports = {
  URL_REGEX,
  DB,
  PORT,
  SERVER_ERR,
  BAD_REQ,
  NOTFOUND_ERR,
  ALREADY_EXISTS,
  AUTH_ERR,
  FORBIDDEN_ERR,
};
