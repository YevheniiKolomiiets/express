const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('./../db-client.js');

class DictionaryService {
  async add({ phone, city, tariff, booked }) {
    const {
      rows: { 0: existedNumber },
    } = await db.query({
      text: 'SELECT * FROM dictionaries WHERE phone=$1',
      values: [phone],
    });

    if (existedNumber) {
      throw `Number "${existedNumber.phone}" already exists`;
    }

    const id = uuid();

    await db.query({
      text:
        'INSERT INTO dictionaries (id, phone, city, tariff, booked) VALUES ($1, $2, $3, $4, $5);',
      values: [id, phone, city, tariff, booked ?? false],
    });

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

    await db.query({
      text: 'UPDATE dictionaries SET phone=$2, city=$3, tariff=$4, booked=$5 WHERE id=$1',
      values: [id, phone, city, tariff, booked ?? false],
    });

    return {
      ...body,
      id,
    };
  }

  async remove({ id }) {
    await db.query({
      text: 'DELETE FROM dictionaries WHERE id=$1',
      values: [id],
    });

    return { id };
  }
}

module.exports = new DictionaryService();
