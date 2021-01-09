require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



const { Pool, Client } = require('pg')
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dictionary',
    password: 'admin',
    port: 5432,
  })

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'dictionary',
    password: 'admin',
    port: 5432,
  })

  client.connect()


  client.query('SELECT * FROM users', (err, res) => {
    console.log(res.rows)
    client.end()
  })


