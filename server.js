'use strict';

const AuthCookie = require('hapi-auth-cookie');
const env        = require('env2')('config.env');
const Hapi       = require('hapi');
const Bell       = require('bell');

const Welcome    = require('./plugins/welcome.js');
const Account    = require('./plugins/account.js');
const Logout     = require('./plugins/logout.js');
const Login      = require('./plugins/login.js');
const Home       = require('./plugins/home.js');

const Auth       = [Bell, AuthCookie];
const Plugins    = [Login, Welcome, Account, Home, Logout];

const server     = new Hapi.Server();

server.connection({ port: 3000 });

server.register(Auth, (err) => {

    if (err) throw err;

    let authCookieOptions = {
        password: process.env.COOKIE_PASSWORD, // Password used for encryption
        cookie: 'TorHuw', // Name of cookie to set
        isSecure: false // might need to be true in production
    };

    server.auth.strategy('TorHuw', 'cookie', authCookieOptions);

    let bellAuthOptions = {
        provider: 'linkedin',
        password: process.env.LINKEDIN_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        isSecure: false // might need to be true in production
    };

    server.auth.strategy('linkedin-oauth', 'bell', bellAuthOptions);

    server.auth.default('TorHuw');
});

server.register(Plugins, (err) => { if (err) throw err });

server.start((err) => {

  if (err) throw err;

  console.log('Server running at:', server.info.uri);

});

module.exports = server;
