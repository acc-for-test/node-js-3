const express = require('express');
const router = express.Router();

const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = new Task({ ...req.body, boardId: req.params.boardId });
    await tasksService.create(task);
    res.json(task);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.status(task ? 200 : 404).json(task);
  })
  .put(async (req, res) =>
    res.json(
      await tasksService.update(
        req.params.boardId,
        req.params.taskId,
        new Task({
          ...req.body,
          boardId: req.params.boardId,
          id: req.params.taskId
        })
      )
    )
  )
  .delete(async (req, res) =>
    res.sendStatus(
      (await tasksService.remove(req.params.boardId, req.params.taskId))
        ? 204
        : 404
    )
  );

module.exports = router;
