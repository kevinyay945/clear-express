// 參考https://juejin.im/post/5cd000f7e51d456e5a07298f
// https://rongzhuang.me/tutorial/express-js/express-combine-morgan-and-winston/
const path = require('path');
const fs = require('fs');

const {
  createLogger,
  format,
  transports,
  addColors,
} = require('winston');
require('winston-daily-rotate-file');
// 确保项目根目录存在logs文件夹
const logDirectory = path.resolve('./', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// 配置等级和颜色
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    http: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'yellow',
  },
};

// 添加自定义颜色
addColors(config.colors);

const options = {
  allLog: {
    level: 'http',
    filename: path.resolve(logDirectory, 'application-%DATE%-info.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '100m',
    maxFiles: '2d', // keep logs for 14 days
  },
  errorLog: {
    level: 'error',
    filename: path.resolve(logDirectory, 'application-%DATE%-error.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '2d', // keep logs for 30 days
  },
};

function formatParams(info) {
  const { timestamp } = info;
  const { level } = info;
  let { message } = info;
  message = message.replace(/[\r\n\t]/g, '').replace(/\s(?=\s)/g, '');// 第一個是去調換行，第二個是把連續空白刪掉
  return `[${timestamp}] {${level}} ${message}`;
}

const logger = createLogger({
  level: 'http',
  levels: config.levels,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(formatParams),
  ),
  transports: [
    new transports.DailyRotateFile(options.allLog),
    new transports.DailyRotateFile(options.errorLog),
    new transports.Console()],
});

// 添加morgan日志信息
logger.stream = {
  write: (message) => {
    logger.http(message);
  },
};

module.exports = logger;
