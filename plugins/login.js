

  var users = [{ name: 'Tornado', scope: 'admin', id : 'VkekfrcDpl'},
  {name:'hurricane', scope:['admin', 'super'], id:'iIkUSpzijO'}];


  const getValidatedUser = (request_id, users , callback ) =>{
    /// check the user id from the request against existings users return user details.
    /// set the user details into the cookie.
    var user =   users.find((user) => {
      return request_id === user.id
    })
    if (user) {
      console.log('USER DETECTED',user);

      callback(user);
    } else {
      console.log('error');
    }
  }

  exports.register = function(server, options, next) {

    server.route({

      method: 'GET',
      path: '/login',
      config: {
        auth: 'linkedin-oauth',
        handler: (request, reply) => {

        if (request.auth.isAuthenticated) {

            var id = request.auth.credentials.profile.id;

            getValidatedUser(id, users , (user) => {
              request.cookieAuth.set(user);
                return reply('Hello ' + request.auth.credentials.profile.name.first +
                  ', you\'re logged in...' +
                  'Click <a href="/logout">here</a> to logout' +
                  'Click <a href="/">here</a> to go home'
                );
            });

        } else {
              reply('Not logged in...').code(401);
        }
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'Login'
};
