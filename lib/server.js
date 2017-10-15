'use strict';

const http = require('http');
const router = require('./router');

// Just get a server running
const app = http.createServer( router.route );

module.exports = {
  start: (port) => {
    return new Promise( (resolve, reject) => {
      // Running?
      if (app.listening) {
        resolve('already up');
      }
      app.listen(port);
      if (app.listen) {
        resolve(`listening at port: ${port}`);
      } else {
        reject('something went wrong bringing up sever');
      }

    });
  },

  stop: () => {
    return new Promise( (resolve,reject) => {
      if (app.listening) {
        app.close();
      }
      if (!app.listening) {
        resolve('server stopped');
      } else {
        reject('server is still running for some reason');
      }
    });

  },
};
