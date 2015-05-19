var Joi = require('joi');

/**
 *
 * Validation for the user object in the payload
 */
var userSchemaValidation = Joi.object().keys({
  password: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().required(),
  city: Joi.string(),
  state: Joi.string().valid('Arizona', 'Texas', 'Alabama')
});

var create = function (service) {

  var operations = {
    post: {
      description: 'RESTful endpoint for user creation',
      validate: {
        params: false,
        payload: Joi.object().keys({
          users: Joi.array().items(userSchemaValidation)
        })
      },
      pre: [
        { method: service.extractPayload(), assign: 'users' },
        { method: service.transformForStore(), assign: 'documents' },
        { method: service.storeDocuments(), assign: 'result' },
        { method: service.representResults(), assign: 'representation' }
      ],
      handler: function (request, reply) {
        reply(request.pre.representation).code(201);
      }
    }
  };

  var register = function (server, options, next) {

    var pub = server.select('public');
    //add endpoints here
    pub.route({ method: 'POST', path: '/users', config: operations.post});

    next();
  };

  return {
    register: register
  };

};

exports = module.exports = {
  create: create
};
