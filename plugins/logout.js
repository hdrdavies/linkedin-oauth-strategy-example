exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/logout',
        config: {
          auth: false,
          handler: (request, reply) => {

            request.cookieAuth.clear();
            reply.redirect('/');

          }
        }
    });
    return next();
};

exports.register.attributes = {
  name: 'Logout'
};
