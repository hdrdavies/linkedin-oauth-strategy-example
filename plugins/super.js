exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/super',
        config: {
          auth: {
            scope: 'super',
            strategy: 'TorHuw-cookie'
          },
          handler: (request, reply) => {

            reply('Hi there, you\'re a super user!!!' +
            '<br>' +
            'Click <a href="/">here</a> to go home'
            );
          }
        }
    });
    return next();
};

exports.register.attributes = {
  name: 'Super'
};
