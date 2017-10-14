'use strict';

const Note = require('../model/note.js');
const router = require('../lib/router.js');

let notes = {};

let sendStatus = (res, status, text) => {
  res.writeHead(status);
}

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type' : 'application/json'
  })
  res.end(JSON.stringify(data))
}

router.post('/api/notes', (req,res) => {
    // 400 when?
    // Save the note to the stack
    // Send 200
    if (! req.body.title) {

    }
    let not = new Note(req.body);
    notes[node.id]
});

router.delete('/api/notes', (req,res) => {
    // Do I have an id?
    // Is it valid
    // Nuke it
    // Send 200 if all is well

});

router.put('/api/notes', (req,res) => {
    // Do I have an id?
    // Is it valid
    // Replace it
    // Send 200 if all is well

});

router.patch('/api/notes', (req,res) => {
    // Do I have an id?
    // Is it valid
    // Update it
    // Send 200 if all is well

});

router.get('/api/notes', (req,res) => {
  let id = 
    // If we have an id
        // try and pull it from the stack
            // send it
        // 404 not found or 400 invalid query?

    // List all

});
