const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const port = config.APP_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', require('./controllers/auth.js'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
