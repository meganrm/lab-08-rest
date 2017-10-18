/*global beforeAll,afterAll,expect*/
'use strict';

process.env.PORT = 5000;
const server = require('../lib/server');
const superagent = require('superagent');
require('../note/route');
const Note = require('../note/model');
const url = `http://localhost:${process.env.PORT}/api/notes`;

describe('api/notes', function() {

  beforeAll(() => {
    return server.start(process.env.PORT);
  });

  afterAll(server.stop);

  describe('GET /api/notes', () => {

    test('should return the same note if look up by id', () => {
      //return is key, superagent will wait til resolved
      let id = 'testID';
      Note.allNotes[id] = {title: 'title', contents: 'body'};
      return superagent.get(url + '?id=' + id)
        .then(res=>{
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('title');
        })

    });

    test('should respond with a 200 when getting all notes', () => {
      //return is key, superagent will wait til resolved
      return superagent.get(url)
        .then(res=>{
          expect(res.status).toEqual(200);
        });
    });

    test('should respond with a 404 if note is not there', () => {
      return superagent.get(`${url}?id=foo`)
        .catch(error => {
          expect(error.status).toEqual(404);
          expect(error.response.text).toEqual('cannot find a note for the id: foo');
        })
      ;
    });
  });

  describe('DELETE /api/notes', () => {

    test('should return the 200 if deleted note', () => {
      //return is key, superagent will wait til resolved
      let id = 'deleteTestID';
      Note.allNotes[id] = {id: id, title: 'title to be deleted', contents: 'body to be deleted'};
      return superagent.delete(url + '?id=' + id)
        .then(res=>{
          expect(res.text).toEqual('deleted {"id":"deleteTestID","title":"title to be deleted","contents":"body to be deleted"} successfully');
          expect(res.status).toEqual(200);
        });
    });


    test('should respond with a 404 if note is not there', () => {
      return superagent.delete(`${url}?id=foo`)
        .catch(error => {
          expect(error.response.text).toEqual('no note with the ID foo');
          expect(error.status).toEqual(404);
        })
      ;
    });
  });

  describe('PATCH /api/notes', () => {

    test('should return the an updated note', () => {
      //return is key, superagent will wait til resolved
      let id = 'testID';
      Note.allNotes[id] = {id: id, title: 'title', contents: 'body'};
      return superagent.patch(`${url}?id=${id}`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'this is the updated title',
        })
        .then(res=>{
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('this is the updated title');
        });
    });


    test('should respond with a 404 if note is not there', () => {
      return superagent.patch(`${url}?id=foo`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'this is the updated title',
        })
        .catch(error => {
          expect(error.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/notes', () => {

    test('should put a note at the specificed endpoint', () => {
      //return is key, superagent will wait til resolved
      return superagent.put(`${url}?id=foo`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'this is the title',
          contents: 'this is the body',
        })
        .then(res=>{
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('this is the title');
        });
    });

    test('should respond with a 400 if there is no id', () => {
      return superagent.put(`${url}`)
        .set('Content-Type', 'application/json')
        .send({
          title: 'this is the title',
          contents: 'this is the body',
        })
        .catch(error => {
          expect(error.response.res.text).toEqual('need ID');
          expect(error.status).toEqual(400);
        });
    });
  });

  describe('POST /api/notes', () => {

    test('should respond with a 200', () => {
      //return is key, superagent will wait til resolved
      return superagent.post(url)
        .set('Content-Type', 'application/json')
        .send({
          title:'hello world',
          contents: 'this is my first note',
        })
        .then(res=>{
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('hello world');
          expect(res.body.contents).toEqual('this is my first note');
        });
    });

    test('should respond with a 400 if no title', () => {
      return superagent.post(url)
        .set('Content-Type', 'application/json')
        .send({
          contents: 'this is my first note',
        })
        .catch(res=>{
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 if no contents', () => {
      return superagent.post(url)
        .set('Content-Type', 'application/json')
        .send({
          title: 'my title',
        })
        .catch(res=>{
          expect(res.status).toEqual(400);
        });
    });
  });
});
