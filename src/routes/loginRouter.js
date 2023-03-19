const express = require('express');
const generateToken = require('../utils/tokenGenerator');

const validateEmail = require('../middlewares/validateEmail');
const validatePass = require('../middlewares/validatePass');

const router = express.Router();

router.use(express.json());

router.post('/', validateEmail, validatePass, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;
