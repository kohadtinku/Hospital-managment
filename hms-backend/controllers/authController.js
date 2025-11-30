const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.login = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.registerDoctor = async (req,res) => {
  const { name, email, password, specialization, phone, hospital } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const user = await User.create({ name, email, password, role: 'doctor', specialization, phone, hospital });
  res.json({ user });
};
