const express = require('express');
const { getAllTalkers, addTalker, updateTalker } = require('../utils/fs/index');
const validateAge = require('../middlewares/validateAge');
const validateName = require('../middlewares/validateName');
const validateRate = require('../middlewares/validateRate');
const validateTalk = require('../middlewares/validateTalk');
const validateToken = require('../middlewares/validateToken');
const validateWatchedAt = require('../middlewares/validateWatchedAt');

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

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;

    const newTalker = await addTalker({
        name, age, talk: { watchedAt, rate },
    });

    return res.status(201).json(newTalker);
  });

router.put('/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const talker = req.body;

    const updTalker = await updateTalker(Number(id), talker);

    if (!updTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(updTalker);
  });

module.exports = router;
