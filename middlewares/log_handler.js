const morgan = require('morgan');

const logger = require('../config/logger');

// 解决自定义格式时响应时间不着色的问题
morgan.token('status', (req, res) => {
  const status = (typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent)
    ? res.statusCode
    : undefined;
  // get status color
  let color = 0;
  if (status >= 500) {
    color = 31;
  } else if (status >= 400) {
    color = 33;
  } else if (status >= 300) {
    color = 36;
  } else if (status >= 200) {
    color = 32;
  } else {
    color = 0;
  }
  return `\x1b[${color}m${status}\x1b[0m`;
});

const devModify = ':remote-addr :method :url :status :response-time ms';
const combinedModify = ':remote-addr :method :url :status :response-time ms "';
// const combinedModify = ':remote-addr :method :url :status :response-time ms :user-agent"'
const morganFormat = process.env.NODE_ENV === 'development' ? devModify : combinedModify;

module.exports = morgan(morganFormat, { stream: logger.stream });
