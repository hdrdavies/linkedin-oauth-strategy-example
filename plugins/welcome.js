const Request    = require('request');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/welcome',
        config: {
          auth: {
            strategy:'TorHuw',
            scope: 'admin'
          },
        },
        handler: (request, reply) => {

           return  reply('Success');
             
        }
        
    });

    return next();
};

exports.register.attributes = {
  name: 'welcome'
};
