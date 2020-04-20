const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('config');
const cors = require('cors');
const startupDebugger = require('debug')('app:startup');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swagger_define/swaggerDocs');
const mountRoutes = require('./routes');
const handleLog = require('./middlewares/log_handler');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(handleLog);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
mountRoutes(app);
const port = process.env.PORT || 15001;
startupDebugger(`${config.get('name')} is opening`);
app.listen(port, () => startupDebugger(`Listening on port ${port}...`));
