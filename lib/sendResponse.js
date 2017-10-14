'use strict';

let send = {};

send.sendResponse = function(res, status, body) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(body);
  res.end();
};

send.sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type' : 'application/json',
  });
  res.end(JSON.stringify(data));
};

module.exports = send;
