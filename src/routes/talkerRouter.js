const express = require('express');
const { getAllTalkers } = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await getAllTalkers();

  return res.status(200).json(data);
});

module.exports = router;