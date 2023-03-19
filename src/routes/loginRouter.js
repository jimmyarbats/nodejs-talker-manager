const express = require('express');
const generateToken = require('../utils/tokenGenerator');

const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;
