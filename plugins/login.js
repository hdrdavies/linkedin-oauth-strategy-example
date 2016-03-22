var querystring = require('querystring');

exports.register = function(server, options, next) {

    server.route({

        method: 'GET',
        path: '/login',
        config: {
            auth: 'linkedin-oauth',
            handler: (request, reply) => {

              if (request.auth.isAuthenticated) {

                console.log('isAuthenticated', request.auth.isAuthenticated);
                console.log('credentials', request.auth.credentials);
                console.log('session', request.auth.session);

                request.auth.session.set(request.auth.credentials);
                return reply('Hello ' + request.auth.credentials.profile.displayName);

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
