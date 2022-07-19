const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const register = async (req, res) => {
  const user = new User({ ...req.body });
  await user.save();
  res.status(StatusCodes.CREATED).json({ msg: 'user created', user });
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register,
  login,
}