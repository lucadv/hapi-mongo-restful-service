var _ = require('lodash');
var Async = require('Async');

var create = function (dao) {

  var storeDocuments = function () {
    return function (request, reply) {
      Async.eachSeries(request.pre.documents, function (doc, callback) {
        dao.insert(doc, function (err, result) {
          callback(err, result);
        });
      }, function (err, result) {
        reply(result);

      });
    };
  };

  var extractPayload = function () {
    return function (request, reply) {
      reply(request.payload.users);
    };
  };

  var transformForStore = function () {
    return function (request, reply) {
      // transform each user adding the composed field username = name.surname
      Async.waterfall([
        function (callback) {
          var docs = [];
          _.each(request.pre.users, function (u) {
            var username = u.name.replace(' ', '.') +  '.' + u.surname.replace(' ', '.');
            docs.push(_.merge(u, { username: username }));
          });
          callback(docs);
        }
      ], function (docs) {
        reply(docs);
      });
    };
  };

  var representResults = function () {
    return function (request, reply) {
      var results = {
        users: request.pre.documents
      };
      reply(results);
    };
  };

  return {
    extractPayload: extractPayload,
    transformForStore: transformForStore,
    storeDocuments: storeDocuments,
    representResults: representResults
  };
};

exports = module.exports = {
  create: create
};
