/* ****************************************************************
 * Name: logs.js
 * Description: set up application logging for Winston
 *              https://github.com/winstonjs/winston
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

const winston = require('winston');

/*
 * Level specifies message level. Logger will only output messages of
 * a specified level and higher. In this configuration, production mode
 * will only log messages with a level of info or higher, and development
 * mode will only log messages with a level of debug or higher
 * Message Levels in order of priority:
 * 0 error
 * 1 warn
 * 2 info
 * 3 verbose
 * 4 debug
 * 5 silly
 */

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
