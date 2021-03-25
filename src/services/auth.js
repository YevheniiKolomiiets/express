const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('./../db-client.js');
const Config = require('../config');

class AuthService {
  async register({ login, password }) {
    const {
      rows: { 0: user },
    } = await db.query({
      text: 'SELECT * FROM users WHERE login=$1',
      values: [login],
    });

    if (user) {
      throw `User "${login}" already exists`;
    }

    const id = uuid();
    const hash = await bcrypt.hash(password, 10);

    await db.query({
      text: 'INSERT INTO users (id, login, password) VALUES ($1, $2, $3);',
      values: [id, login, hash],
    });

    return { id, login };
  }

  async login({ login, password }) {
    const {
      rows: { 0: user },
    } = await db.query({
      text: 'SELECT * FROM users WHERE login=$1',
      values: [login],
    });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password ?? '');

    if (isPasswordCorrect) {
      const authToken = jwt.sign({ id: user?.id }, Config.JWT_SECRET, { expiresIn: '24h' });

      return {
        id: user?.id,
        login: user?.login,
        authToken,
      };
    } else {
      throw 'Email or password is incorrect';
    }
  }
}

module.exports = new AuthService();
