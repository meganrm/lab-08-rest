'use strict';

require('dotenv').config();
// require("./lib/server").start();

const server = require('./lib/server');
const note = require('./note/route');

server.start(process.env.PORT)
  .then(console.log)
  .catch(console.log);
