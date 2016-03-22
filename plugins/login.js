exports.register = function(server, options, next) {

    server.route({

        method: 'GET',
        path: '/login',
        config: {
            auth: 'linkedin-oauth',
            handler: (request, reply) => {

              if (request.auth.isAuthenticated) {

                request.cookieAuth.set(request.auth.credentials);

                return reply('Hello ' + request.auth.credentials.profile.name.first +
                ', you\'re logged in...' +
                'Click <a href=/logout>here</a> to logout'
                );
              }
              reply('Not logged in...').code(401);
            }
        }
    });
    return next();
};

exports.register.attributes = {
    name: 'Login'
};
