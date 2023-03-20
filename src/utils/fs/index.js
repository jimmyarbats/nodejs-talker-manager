const fs = require('fs/promises');
const { join } = require('path');

const PATH = '../../talker.json';

const getAllTalkers = async () => {
  const data = await fs.readFile(join(__dirname, PATH));
  return JSON.parse(data);
};

const writeFileTalker = async (content) => fs
  .writeFile(join(__dirname, PATH), JSON.stringify(content, null, 2));

const addTalker = async (talker) => {
  const data = await getAllTalkers();
  const talkerId = data
    .reduce((talk, { id }) => (id > talk ? id : talk), 0);

  const newTalker = {
    id: talkerId + 1,
    ...talker,
  };

  data.push(newTalker);

  await writeFileTalker(data);

  return newTalker;
};

const updateTalker = async (id, { name, age, talk }) => {
  const data = await getAllTalkers();
  
  if (!data.some((talker) => talker.id === id)) {
    return false;
  }
  
  const updData = data.map((talker) => ((talker.id === id)
    ? { id, name, age, talk }
    : talker));

  await writeFileTalker(updData);
  
  return { id, name, age, talk };
};

const deleteTalker = async (id) => {
  const data = await getAllTalkers();
  
  if (!data.some((talker) => talker.id === id)) {
    return false;
  }
  
  const updData = data.filter((talker) => talker.id !== id);
  
  await writeFileTalker(updData);
  
  return true;
};

module.exports = {
  getAllTalkers,
  addTalker,
  updateTalker,
  deleteTalker,
};
