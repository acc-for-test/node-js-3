const os = require('os');
const { createWriteStream, writeFileSync } = require('fs');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

module.exports =
  {
    errorLog:
      createLogger({
        transports: [
          new transports.Console(),
          new transports.File({
            filename: __dirname + '/../../error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
          })
        ]
      }),
    accessLog: morgan('combined', { stream: createWriteStream(__dirname + '/../../access.log', { flags: 'a+' }) })
  };
