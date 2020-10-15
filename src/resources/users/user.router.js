const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
      return res.json((await usersService.getAll()).map(User.toResponse));
    }
  )
  .post(async (req, res) => {
    const user = new User(req.body);
    await usersService.create(user);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(user ? 200 : 404).json(user);
  })
  .put(async (req, res) =>
    res.json(await usersService.update(req.params.id, { ...req.body }))
  )
  .delete(async (req, res) =>
    res.sendStatus((await usersService.remove(req.params.id)) ? 200 : 404)
  );

module.exports = router;
