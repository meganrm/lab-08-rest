'use strict';

const uuid = require('uuid/v1');

class Note {

  constructor(opts) {
    this.id = uuid();
    this.title = opts.title;
    this.date = new Date();
    this.contents = opts.contents;
  }

  // Instance (prototype) Methods
  toString() {
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
