const DB = require('../../common/db');

const getAll = async boardId => DB.getAllTasksByBoard(boardId);
const get = async (boardId, taskId) => DB.getTask(boardId, taskId);
const create = async task => DB.createTask(task);
const update = async (boardId, taskId, task) =>
  DB.updateTask(boardId, taskId, task);
const remove = async (boardId, taskId) => DB.removeTask(boardId, taskId);

module.exports = { getAll, get, create, update, remove };
