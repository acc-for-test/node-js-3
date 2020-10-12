const DB = require('../../common/db');

const getAll = async () => DB.getAllUsers();
const get = async id => DB.getUser(id);
const create = async user => DB.createUser(user);
const update = async (id, user) => DB.updateUser(id, user);
const remove = async id => DB.removeUser(id);

module.exports = { getAll, get, create, update, remove };
