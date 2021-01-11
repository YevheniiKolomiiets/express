const express = require('express');
const router = express.Router();
const AuthService = require('./../services/auth.js');

router.post('/register', register);
router.post('/login', login);

async function register(req, res) {
  try {
    const response = await AuthService.register(req.body);
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

async function login(req, res) {
  try {
    const response = await AuthService.login(req.body);
    res.send(response);
  } catch (e) {
    res.status(400).json({ message: e });
  }
}

module.exports = router;
