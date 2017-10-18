'use strict';

const Note = require('../note/model.js');
const router = require('../lib/router.js');
const routes = router.routeHandlers;
const send = require('../lib/sendResponse');

function post(body, res) {
  if (! (body.title || body.contents)) {
    return send.sendResponse(res, 400, 'needs a title and contents');
  }
  let note = new Note(body);
  note.addNote();
  send.sendJSON(res, 200, note);
}

function sendNote(req, res){
  let id = req.url.query.id;
  let status = 400;
  let sendBody = 'something went wrong';
  let note = Note.allNotes[id];
  if (note) {
    status = 200;
    sendBody = note;
    send.sendJSON(res, status, sendBody);
  } else {
    status = 404;
    sendBody = `cannot find a note for the id: ${id}`;
    send.sendResponse(res, status, sendBody);
  }
}

function idQueryTest(req, res){
  let ret = false;
  if (req.url && req.url.query && req.url.query.id) {
    ret = true;
  } else {
    send.sendResponse(res, 400, `need ID`);
    ret =  false;
  }
  return ret;
}

routes.post('/api/notes', (req,res) => {
  post(req.body, res);
});

routes.delete('/api/notes', (req, res) => {
  if (idQueryTest(req, res)) {
    let id = req.url.query.id;
    let note = Object.assign({}, Note.allNotes[id]);
    if (note.id) {
      new Note(Note.allNotes[id]).deleteNote();
      if (!Note.allNotes[id]) {
        send.sendResponse(res, 200, `deleted ${JSON.stringify(note)} successfully`);
      } else {
        send.sendResponse(res, 400, `please try to delete again`);
      }
    } else {
      send.sendResponse(res, 404, `no note with the ID ${req.url.query.id}`);
    }
  }
});

routes.put('/api/notes', (req,res) => {
  if (idQueryTest(req, res)) {
    Note.allNotes[req.url.query.id] = {};
    post(req.body, res);
  }
});

routes.patch('/api/notes', (req,res) => {
  if (idQueryTest(req, res)) {
    let currentNote = Note.getNote(req.url.query.id);
    let updatedNote = (req.body);
    if (currentNote) {
      let newNote = new Note(Object.assign(currentNote, updatedNote));
      post(newNote, res);
    } else {
      send.sendResponse(res, 404, `cannot find a note for the id: ${req.url.query.id}`);
    }
  }
});

routes.get('/api/notes', (req,res) => {
  let isIdQuery = req.url && req.url.query && req.url.query.id ? true: false;
  let status = 400;
  if (isIdQuery) {
    sendNote(req, res);
  } else {
    status = 200;
    let sendBody = Note.allNotes;
    if (sendBody) {
      send.sendJSON(res, status, sendBody);
    } else {
      status = 404;
      send.sendResponse(res, status, 'no notes! this is pretty terrible');
    }
  }
});
