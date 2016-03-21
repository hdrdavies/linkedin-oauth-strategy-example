'use strict'

const test = require('tape');
const shot = require('shot');
const server = require('./server.js');
const url = require('url');

const qs = require('qs');

require('env2')('config.env');

test('/login endpoint redirects to linkedin', (t) => {
    let actual, expected;
    var options = {
        url: '/login',
        method: 'GET'
    };

    server.inject(options, (response) => {
        console.log(response.statusCode)
        actual = response.statusCode;
        expected = 302;
        t.equal(actual, expected, 'Successful redirect');

        var redirectOpts = url.parse(response.headers.location);
        actual = redirectOpts.host;
        expected = 'www.linkedin.com';
        t.equal(actual, expected, 'redirect is to Linkedin');

     
        actual= qs.parse(redirectOpts.query).client_id;
        expected= process.env.CLIENT_ID ;
        t.equal( actual, expected, 'Client Id is in redirect');

        actual = qs.parse(redirectOpts.query).redirect_uri;
        expected = process.env.BASE_URL;

        t.equal(actual , expected , 'Redirects to our BASE URL');
        t.end();

    });
})