/**
 *
 * Contains configuration info for the hapi server and for the mongodb connection
 */
var options = {
  connections: [
    {
      port: 8010,
      labels: ['public']
    }
  ],
  plugins: [
    {
      name: './' // this tells hapi to register everything as a plugin
    }
  ],
  db: {
    uri: 'mongodb://localhost:27017/restful-service-db',
    options: {}
  }
};

exports = module.exports = options;