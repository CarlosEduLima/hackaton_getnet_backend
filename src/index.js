global.__require = function (file) {
  return require(__dirname + '/' + file)
}
require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require('./database');

const app = express();
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);
app.use(express.json());
app.use(cors());
app.use(routes);
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})
const server = app.listen(process.env.PORT || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
})