var querystring  = require('querystring');

exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/login',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {

              var params = {
                  client_id: process.env.CLIENT_ID,
                  redirect_uri: process.env.BASE_URL,
                  response_type: 'code',
                  state: 'DCEeFWf45A53sdfKef424'
              }

              reply.redirect(
                  'https://www.linkedin.com/uas/oauth2/authorization?' + querystring.stringify(params)
              );
          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Login'
};
