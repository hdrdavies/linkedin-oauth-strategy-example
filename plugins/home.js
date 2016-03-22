exports.register = function (server, options, next) {

    server.route({

        method: 'GET',
        path: '/',
        config: {
          auth: false,
          handler: (request, reply) => {

            reply('Hi there, click <a href="/login">here<a> to login to our site using linkedin!');

          }
        }
    });
    return next();
};

exports.register.attributes = {
  name: 'Home'
};
