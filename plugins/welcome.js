const Request    = require('request');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/welcome',
        config: {
          auth: 'linkedin-oauth',
          handler: (request, reply) => {

              const code = request.url.query.code;

              Request({
                  url: 'https://www.linkedin.com/uas/oauth2/accessToken',
                  method: 'POST',
                  headers: {
                      ContentType: 'application/x-www-form-urlencoded'
                  },
                  qs:{
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.BASE_URL,
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET
                }
              }, function(error, response, body) {

                  if (error) {
                      console.log(error);
                  } else {
                      const accessToken = JSON.parse(body).access_token;

                      Request({
                          method:'GET',
                          headers: {
                                authorization: 'Bearer '+ accessToken,
                          },
                          url:'https://api.linkedin.com/v1/people/~?',
                          qs: {
                              connection:'Keep-Alive',
                              format:'json',
                          }
                      }, function (err , response , body ){
                          if(err) {
                              console.log(err);
                          } else {

                              var id = JSON.parse(response.body).id ;

                              reply('Success!')
                                  .state('access_token', accessToken)
                                  .state('id', id);
                          }
                      });
                  }
              });
          }
        }
    });

    return next();
};

exports.register.attributes = {
  name: 'Welcome'
};
