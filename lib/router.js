'use strict';

const parser = require('./parse-request');
const router = module.exports = {};
const send = require('./sendResponse');
// Route Registry
// Store route handlers for each of the verbs ...
/*
    i.e.
    GET: {
        "/api/note" : (req, res) => {},  ....
    }
*/
router.routeHandlers = {
  get: {},
  put: {},
  post: {},
  patch: {},
  delete: {},
};

Object.keys(router.routeHandlers).forEach((method) => {
  router.routeHandlers[method] = function(path, callback) {
    router.routeHandlers[method][path] = callback;
  };
});


router.route = (req, res) => {
  //parse the request
  parser(req).then(request => {
    if (!request.method) {
      return send.sendResponse(res, 400, 'not a request');
    }

    let method = req.method.toLowerCase();
    if (router.routeHandlers[method] && typeof router.routeHandlers[method][req.url.pathname] === 'function') {

      router.routeHandlers[method][req.url.pathname](request, res);

    } else {
      // Return a 400 if the request itself is invalid
      return send.sendResponse(res, 400, `not a method ${router.routeHandlers[method]}`);
    }

  }).catch(e => {
    send.sendResponse(res, 400, e.toString());
  });

};
