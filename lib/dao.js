/**
 *
 * @param db db connection object
 * @constructor
 */
var Dao = function (db) {
  this.db = db;
  this.collection = this.db.collection('users'); //hardcoded for the sake of the example
};

Dao.prototype.insert = function (documents, callback) {
  this.collection.insert(documents, callback);
};

/*
Dao.prototype.findOne = function (query, callback) {
  this.collection.findOne(query, callback);
}
*/

Dao.prototype.removeMany = function (callback) {
  this.collection.removeMany();
  callback();
};

exports = module.exports = Dao;
