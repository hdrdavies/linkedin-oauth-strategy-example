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
                console.log('BODY>>>', response.statusCode, body);
                let accessToken = JSON.parse(body).access_token;
                reply('Success!').state('access_token', accessToken);	
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