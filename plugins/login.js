var querystring = require('querystring');
const AuthCookie = require('hapi-auth-cookie');



var Users = [{ name: 'Tornado', scope: 'admin', id : 'VkekfrcDpl'},
{name:'hurricane', scope:['admin', 'super'], id:'iIkUSpzijO'}];


const getValidatedUser = (request_id, users ) =>{
/// take request from linked in user id and check against exisiting Users


}

exports.register = function(server, options, next) {

    server.route({

        method: 'GET',
        path: '/login',
        config: { 
            auth: 'linkedin-oauth',
            handler: (request, reply) => {
                  console.log('RA', request.auth);
                if (request.auth.isAuthenticated) {
                    request.cookieAuth.set(request.auth.credentials);
                    var id =  request.auth.credentials.profile.id 
                    
                    getValidatedUser(id, Users) { 
                        if(id){}

                    }

                    

                    return reply('Hello ' + request.auth.credentials.profile.id);
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