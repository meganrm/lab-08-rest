'use strict';

const url = require('url');
const queryString = require('querystring');

// const keywords = ['id'];

//FOR later
// let checkForKeywords = function(url) {
//   let urlTerms = url.split('/');
//   let keyPairs = urlTerms.reduce((acc, cur, index) => {
//     if (keywords.indexOf(cur) !== -1 ) {
//       acc[cur] = urlTerms[parseInt(index) + 1];
//     }
//     return acc;
//   }, []);
//   return keyPairs;
// };

module.exports = (req) => {

  return new Promise( (resolve, reject) => {
    // URL
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    // req.keyPairs = checkForKeywords(req.url);
    // if (req.keyPairs.id) {
    //   req.url.pathname = 'api/notes/id'
    // }

    if (! ( req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH' ) ) {
      resolve(req);
    }

    let text = '';
    req.on('data', (buffer) => {
      text += buffer.toString();
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(text);
        resolve(req);
      } catch(e){
        reject (`not a good json ${text}`);
      }
    });
    req.on('error', reject);
  });

};
