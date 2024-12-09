const knex = require('../config/db');

const getTasks = async (req, res) => {
  const tasks = await knex('tasks').where({ user_id: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  await knex('tasks').insert({ user_id: req.user.id, title, description, status });
  res.status(201).send('Task created');
};

const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  await knex('tasks').where({ id: req.params.id, user_id: req.user.id }).update({ title, description, status });
  res.send('Task updated');
};

const deleteTask = async (req, res) => {
  await knex('tasks').where({ id: req.params.id, user_id: req.user.id }).del();
  res.send('Task deleted');
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
