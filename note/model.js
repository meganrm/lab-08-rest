'use strict';

const uuid = require('uuid/v1');

class Note {

  constructor(opts) {
    this.id = opts.id || uuid();
    this.date = new Date();
    this.title = opts.title;
    this.contents = opts.contents;
  }

  // Instance (prototype) Methods
  toString() {
  }

  deleteNote(){
    Note.allNotes[this.id] = null;
    delete Note.allNotes[this.id];
  }

  addNote() {
    Note.allNotes[this.id] = this;
  }

}

Note.allNotes = {};

Note.getNote = function(id) {
  let note = false;
  if (id && Note.allNotes[id]) {
    note = Note.allNotes[id];
  }
  return note;
};

module.exports = Note;
