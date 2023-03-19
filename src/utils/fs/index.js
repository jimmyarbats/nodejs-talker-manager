const fs = require('fs/promises');
const { join } = require('path');

const PATH = '../../talker.json';

const getAllTalkers = async () => {
  const data = await fs.readFile(join(__dirname, PATH));
  return JSON.parse(data);
};

module.exports = {
  getAllTalkers,
};
