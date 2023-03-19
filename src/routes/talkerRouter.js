const express = require('express');
const { getAllTalkers } = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await getAllTalkers();

  return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getAllTalkers();
  const talker = data.find(({ id: findId }) =>
    findId === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return res.status(200).json(talker);
});

module.exports = router;
