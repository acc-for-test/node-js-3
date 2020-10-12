const express = require('express');
const router = express.Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => res.json(await boardsService.getAll()))
  .post(async (req, res) => {
    const b = new Board({ ...req.body });
    await boardsService.create(b);
    res.json(b);
  });
router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(board ? 200 : 404).json(board);
  })
  .put(async (req, res) =>
    res.json(
      (await boardsService.update({ id: req.params.id, ...req.body }))
        ? 200
        : 404
    )
  )
  .delete(async (req, res) =>
    res.sendStatus((await boardsService.remove(req.params.id)) ? 200 : 404)
  );

module.exports = router;
