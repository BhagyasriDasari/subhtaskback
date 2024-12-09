const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../config/db');

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await knex('users').insert({ username, password: hashedPassword });
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await knex('users').where({ username }).first();
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};

module.exports = { register, login };
