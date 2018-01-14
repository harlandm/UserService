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
var users = require('./routes/users');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', users);

// Middleware with an arity of 4 are called for error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

// If no other middleware has been invoked by this point, respond with a 404
app.use((req, res, next) => {
  var method = req.method;
  var proto = req.protocol;
  var server = req.hostname;
  var url = req.originalUrl;
  console.warn(method + ' of ' + proto + '://' + server + url + ' - The requested resource could not be found');
  res.status(404).send({ error: 'The requested resource could not be found' });
});

var server = app.listen(pe.npm_package_config_port, function() {
  var name = pe.npm_package_config_displayname;
  var host = pe.npm_package_config_host;
  var port = server.address().port;
  console.log('%s listening on http://%s:%s', name, host, port);
});
