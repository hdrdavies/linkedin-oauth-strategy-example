exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/account',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {

            reply('Account');

          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Account'
};
