exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/admin',
        config: {
          auth: {
            scope: 'admin',
            strategy: 'TorHuw-cookie'
          },
          handler: (request, reply) => {

            reply('Hi there, you\'re an Admin!!!' +
            '<br>' +
            'Click <a href="/">here</a> to go home'
            );
          }
        }
    });
    return next();
};

exports.register.attributes = {
  name: 'Admin'
};
