'use strict';

console.log('######');

var env = require('env2')('config.env');
const Hapi = require('hapi');
const Request = require('request');

const querystring = require('querystring');
const server = new Hapi.Server();

server.connection({ port: 3000 });

server.route([{

    method: 'GET',
    path: '/login',
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
}, {
    method: 'GET',
    path: '/welcome',
    handler: (request, reply) => {
        console.log('CODE', request.url.query.code);
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
        },
        function(error, response, body) {


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
               
                }, 
                function (err , response , body ){
                    if(err) { 
                        console.log(err);
                    } else {
                        console.log('RESPONSE', Object.keys(response), 'UUID:', JSON.parse(response.body).id);

                        var id = JSON.parse(response.body).id ; 
                
                        reply(response)
                            .state('access_token', accessToken )
                            .state('id', id);   
                    }

                });

            }
        });
    }
}]);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports = server;