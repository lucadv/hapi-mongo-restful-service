// Load modules
var Async = require('async');
var DB = require('../db');
var Config = require('../config');
var Dao = require('./dao');
var Service = require('./service');
var Endpoints = require('./endpoints');

exports.register = function (server, options, next) {

  Async.waterfall([
    function (callback) {
      var db = new DB(Config.db);
      db.connect(callback);
    },
    function (db, callback) {
      var dao = new Dao(db);
      var service = Service.create(dao);
      var endpoints = Endpoints.create(service);
      endpoints.register(server, options, callback);
    }
  ], function () {
      next();
  });
};

exports.register.attributes = {
  pkg: require('../package.json')
};
