// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apikey: process.env.APIKEY,
  organisation: process.env.ORGANISATION,
  port: process.env.PORT
};