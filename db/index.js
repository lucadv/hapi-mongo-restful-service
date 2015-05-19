/**
 * Handle mongodb connection
 */

var MongoClient = require('mongodb').MongoClient;

var DB = function (config) {
  this.uri = config.uri;
  this.options = config.options
};

DB.prototype.connect = function (callback) {
  MongoClient.connect(this.uri, this.options, callback)
};

exports = module.exports = DB;