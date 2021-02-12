const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('./../db-client.js');

class DictionaryService {
  async add({ phone, city, tariff, booked }) {
    const {
      rows: { 0: existedNumber },
    } = await db.query(
      `SELECT *
      FROM dictionaries
      WHERE phone='${phone}'`,
    );

    if (existedNumber) {
      throw `Number "${existedNumber.phone}" already exists`;
    }

    const id = uuid();

    await db.query(
      `INSERT INTO dictionaries (id, phone, city, tariff, booked)
       VALUES ('${id}', '${phone}', '${city}', '${tariff}', '${booked ?? false}');`,
    );

    return { id, phone, city, tariff, booked };
  }

  async getAll() {
    const { rows } = await db.query(
      `SELECT *
      FROM dictionaries`,
    );

    return rows;
  }

  async edit({ body, params }) {
    const { id } = params;
    const { phone, city, tariff, booked } = body;

    await db.query(
      `UPDATE dictionaries
       SET phone='${phone}', city='${city}', tariff='${tariff}', booked=${booked ?? false}
       WHERE id='${id}'`,
    );

    return {
      ...body,
      id,
    };
  }

  async remove({ id }) {
    await db.query(
      `DELETE FROM dictionaries
       WHERE id='${id}'`,
    );

    return { id };
  }
}

module.exports = new DictionaryService();
