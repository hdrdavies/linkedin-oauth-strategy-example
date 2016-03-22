exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/logout',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {

            reply('Logout');

          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Logout'
};
