const Request    = require('request');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/welcome',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {


             
          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Welcome'
};
