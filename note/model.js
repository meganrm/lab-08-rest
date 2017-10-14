'use strict';

const uuid = require("uuid/v1");

class Note {

    constructor(opts) {
        this.id = uuidv1();
        this.title = opts.title;
        this.date = new Date();
        this.content = opts.content;
    }

    // Instance (prototype) Methods
    toString() {
    }

}

module.exports = Note;
