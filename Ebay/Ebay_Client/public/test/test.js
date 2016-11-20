

var express = require('express');
var request = require('request');
var assert = require('assert');
var http = require('http');
var mocha = require('mocha');

it('Test Login with Right Credentials', function(done) {
    request.post(
        'http://localhost:3000/checkLogin',
        { form: { username: 'shreykbhatt',password:'test' } },
        function (error, response, body) {
            assert.equal(200, response.statusCode);
            done();
        }
    );
});

it('Test the My advertisement page', function (done) {
    http.get('http://localhost:3000/myadvertisement', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test get home page', function (done) {
    http.get('http://localhost:3000/homepage', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test cart page', function (done) {
    http.get('http://localhost:3000/cart', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});

it('Test My orders Page', function (done) {
    http.get('http://localhost:3000/myorders', function (res) {
        assert.equal(200, res.statusCode);
        done();
    });
});