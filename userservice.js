/*
 *
 * Title:       userservice.js
 * Description: Simple api to manage a user persistance layer.
 *
 * Copyright:   Copyright (c) 2018
 * Author:      Mark Harland
 *
 */
'use strict';

var pe = process.env;
var express = require('express');
var bodyParser = require('body-parser');
var about = require('./routes/about');
var users = require('./routes/users');
var Message = require('./model/message');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/about', about);
app.use('/users', users);

// Middleware with an arity of 4 are called for error handling
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }]*/
app.use(function(err, req, res, next) {
  console.error(err.stack);
  var message = new Message();
  message.addErrorItem({ 'status': err.status || 500, 'message': err.message });
  res.status(message.errors[0].status).send(message);
});

// If no other middleware has been invoked by this point, respond with a 404
app.use((req, res, next) => {
  var method = req.method;
  var proto = req.protocol;
  var server = req.hostname;
  var url = req.originalUrl;
  console.warn(method + ' of ' + proto + '://' + server + url + ' - The requested resource could not be found');

  var message = new Message();
  message.addErrorItem({ 'status': 404, 'message': 'The requested resource could not be found' });
  res.status(message.errors[0].status).send(message);
});

var server = app.listen(pe.npm_package_config_port, function() {
  var name = pe.npm_package_config_displayname;
  var host = pe.npm_package_config_host;
  var port = server.address().port;
  console.log('%s listening on http://%s:%s', name, host, port);
});
