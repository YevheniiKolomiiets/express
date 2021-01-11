const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('./../db-client.js');

class AuthService {
  async register({ login, password }) {
    const {
      rows: { 0: user },
    } = await db.query(
      `SELECT *
      FROM users
      WHERE login='${login}'`,
    );

    if (user) {
      throw `User "${login}" already exists`;
    }

    const id = uuid();
    const hash = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (id, login, password)
       VALUES ('${id}', '${login}', '${hash}');`,
    );

    return { id, login };
  }

  async login({ login, password }) {
    const {
      rows: { 0: user },
    } = await db.query(
      `SELECT *
      FROM users
      WHERE login='${login}'`,
    );

    const isPasswordCorrect = await bcrypt.compare(password, user?.password ?? '');

    if (isPasswordCorrect) {
      const authToken = jwt.sign({ id: user?.id }, 'secret', { expiresIn: '24h' });

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
