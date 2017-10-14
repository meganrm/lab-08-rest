'use strict';

const Note = require('../note/model.js');
const router = require('../lib/router.js');
const routes = router.routeHandlers;
const send = require('../lib/sendResponse');

routes.post('/api/notes', (req,res) => {
  if (! (req.body.title || req.body.contents)) {
    return send.sendResponse(res, 400, 'needs a title and contents');
  }
  let note = new Note(req.body);
  send.sendJSON(res, 200, note);
  note.addNote();

});

routes.delete('/api/notes', (req, res) => {
  let isIdQuery = req.url && req.url.query && req.url.query.id ? true: false;
  if (isIdQuery) {
    let id = req.url.query.id;
    let note = Object.assign({}, Note.allNotes[id]);
    if (note) {
      Note.allNotes[id] = null;
      delete Note.allNotes[id];
      if (!Note.allNotes[id]) {
        send.sendResponse(res, 200, `deleted ${JSON.stringify(note)} successfully`);
      } else {
        send.sendResponse(res, 400, `please try to delete again`);
      }
    } else {
      send.sendResponse(res, 404, `no note with the ID ${req.url.query.id}`);
    }

  } else {
    send.sendResponse(res, 400, `need ID`);
  }
});

routes.put('/api/notes', (req,res) => {
  // Do I have an id?
  // Is it valid
  // Replace it
  // Send 200 if all is well

});

routes.patch('/api/notes', (req,res) => {
  // Do I have an id?
  // Is it valid
  // Update it
  // Send 200 if all is well

});

routes.get('/api/notes', (req,res) => {
  let sendBody;
  let status = 404;
  let isIdQuery = req.url && req.url.query && req.url.query.id ? true: false;
  if (isIdQuery) {
    let id = req.url.query.id;
    let note = Note.allNotes[id];
    if (note) {
      status = 200;
      sendBody = note;
    } else {
      status = 404;
      sendBody = `cannot find a note for the id: ${id}`;
    }
  } else {
    sendBody = Note.allNotes;
  }
  if (sendBody) {
    status = 200;
    send.sendJSON(res, status, sendBody);
  } else {
    status = 404;
    send.sendResponse(res, status, 'no notes! this is pretty terrible');
  }
});
