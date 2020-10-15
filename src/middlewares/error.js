const {errorLog, accessLog} = require('../common/logger');
const createError = require('http-errors');

module.exports = (err, req, res, next) => {
  errorLog.log('error', `${err.message()}\n${err.stack}`);
  res.status(500).send();
};
