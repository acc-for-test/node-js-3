const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./middlewares/error');
const home = require('./middlewares/home');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', home);
app.use(errorHandler);

app.use('/users', userRouter);

app.use('/dbg', (req, res) => {
  // TODO: remove
  const common = require('./common/db');
  const result = [common.UsersDB, common.BoardsDB, common.TasksDB];
  res.json(result);
});

app.use('/boards', boardRouter, taskRouter);

module.exports = app;
