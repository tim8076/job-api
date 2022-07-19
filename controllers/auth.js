const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

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

  // if (!name || !password || !email) {
  //   throw new BadRequestError('Please provide name, email and password');
  // }