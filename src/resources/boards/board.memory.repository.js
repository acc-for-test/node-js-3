const DB = require('../../common/db');

const getAll = async () => DB.getAllBoards();
const get = async id => DB.getBoard(id);
const create = async board => DB.createBoard(board);
const update = async board => DB.updateBoard(board);
const remove = async id => DB.removeBoard(id);

module.exports = { getAll, get, create, update, remove };
