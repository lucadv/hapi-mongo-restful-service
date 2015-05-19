var Async = require('async');
var DB = require('../db');
var Dao = require('../lib/dao');
var Config = require('../config');

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');

//test shortcuts
var lab = exports.lab = Lab.script();
var after = lab.after;
var before = lab.before;
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

var server;

before(function (done) {
  //creating the node server
  server = new Hapi.Server();
  server.connection({labels: ['public']});
  server.register({ register: require('../')}, function (err) {
    expect(err).to.not.exist();
    done();
  });
});

after(function (done) {
  //gonna cleanup the database
  Async.waterfall([
    function (callback) {
      var db = new DB(Config.db);
      db.connect(callback);
    },
    function (db, callback) {
      var dao = new Dao(db);
      dao.removeMany(callback);
    }
  ], function (err) {
    if (err) {
      throw err;
    } else {
      done();
    }
  });
});

describe('Users endpoint', function () {

  describe('Store', function() {

    describe('(with valid request)', function () {

      it('should return 201 Created', function (done) {
        var payload = {
          users: [{
            name: 'Luca',
            surname: 'Di Vincenzo',
            email: 'luca.dv@gmail.com',
            city: 'Dallas',
            state: 'Texas',
            password: 'verysecure'
          }]
        };

        server.inject({ method: 'POST', url: '/users', payload: payload}, function (res) {
          expect(res.statusCode).to.equal(201);
          expect(res.result.users).to.not.be.empty();
          expect(res.result.users[0].username).to.equal('Luca.Di.Vincenzo');
          done();

        });

      });

    });

    describe('(with invalid request)', function () {

      it('should return 400 Bad Request', function (done) {
        var payload = {
          users: [{
            name: 'Luca',
            surname: 'Di Vincenzo',
            email: 'luca.dv@gmail.com',
            city: 'Dallas',
            state: 'Texas'
          }]
        };

        server.inject({ method: 'POST', url: '/users', payload: payload}, function (res) {
          expect(res.statusCode).to.equal(400);
          expect(res.result.error).to.equal('Bad Request');
          expect(res.result.message).to.contain(['users', 'fails', 'password', 'is required']);
          done();
        });

      });

    });

  });

});