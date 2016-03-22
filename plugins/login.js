var querystring = require('querystring');
const AuthCookie = require('hapi-auth-cookie');

exports.register = function(server, options, next) {

    server.route({

        method: 'GET',
        path: '/login',
        config: { 
            auth: 'linkedin-oauth',
            handler: (request, reply) => {
                  console.log('RA', request.auth);
                if (request.auth.isAuthenticated) {

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