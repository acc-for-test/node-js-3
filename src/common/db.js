/* eslint-disable no-cond-assign,yoda,curly */
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const UsersDB = [];
const BoardsDB = [];
const TasksDB = [];

UsersDB.push(new User(), new User(), new User());
BoardsDB.push(new Board(), new Board(), new Board());
TasksDB.push(new Task({ boardId: BoardsDB[0].id }));

const getBy = (id, arr) => {
  const found = arr.filter(el => el.id === id);
  if (found.length > 0) return { ...found[0] };
  return null;
};

const getAllUsers = () => [...UsersDB];
const getAllBoards = () => [...BoardsDB];
const getAllTasksByBoard = boardId => [
  ...TasksDB.filter(el => el.boardId === boardId)
];

const getUser = id => getBy(id, UsersDB);
const getBoard = id => getBy(id, BoardsDB);
const getTask = (boardId, taskId) => {
  const found = TasksDB.filter(
    el => el.id === taskId && el.boardId === boardId
  );
  if (found.length > 0) return { ...found[0] };
  return null;
};

const createUser = user => UsersDB.push(user);
const createBoard = board => BoardsDB.push(board);
const createTask = task => TasksDB.push(task);

const removeUser = id => {
  const idx = UsersDB.findIndex(el => el.id === id);
  if (idx !== -1) {
    UsersDB.splice(idx, 1);
    for (let i = 0; i < TasksDB.length; i++) {
      if (TasksDB[i].userId === id) {
        TasksDB[i].userId = null;
      }
    }
    return true;
  }
  return false;
};

const removeBoard = id => {
  let idx;
  if (-1 !== (idx = BoardsDB.findIndex(el => el.id === id))) {
    BoardsDB.splice(idx, 1);
    TasksDB.splice(
      0,
      TasksDB.length,
      ...TasksDB.filter(el => el.boardId !== id)
    );
    return true;
  }
  return false;
};

const removeTask = (boardId, taskId) => {
  let idx;
  if (
    -1 !==
    (idx = TasksDB.findIndex(el => el.id === taskId && el.boardId === boardId))
  ) {
    TasksDB.splice(idx, 1);
    return true;
  }
  return false;
};

const updateUser = (id, user) => {
  let idx;
  if (-1 !== (idx = UsersDB.findIndex(el => el.id === id))) {
    UsersDB[idx] = new User(user);
    return UsersDB[idx];
  }
  return false;
};

const updateBoard = board => {
  const idx = BoardsDB.findIndex(el => el.id === board.id);
  if (idx !== -1) {
    BoardsDB[idx] = new Board(board);
    return BoardsDB[idx];
  }
  return false;
};

const updateTask = (boardId, taskId, task) => {
  const idx = TasksDB.findIndex(
    el => el.id === taskId && el.boardId === boardId
  );
  if (idx !== -1) {
    TasksDB[idx] = { id: taskId, ...task };
    return TasksDB[idx];
  }
  return false;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
  getAllBoards,
  getBoard,
  createBoard,
  removeBoard,
  updateBoard,
  getAllTasksByBoard,
  getTask,
  createTask,
  removeTask,
  updateTask,
};
