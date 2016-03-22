exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {

            reply('Home');
          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Home'
};
