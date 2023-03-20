const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (Number(rate) < 1 || Number(rate) > 5 || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  
  next();
};
  
module.exports = validateRate;
