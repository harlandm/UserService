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

var express = require('express');
var bodyparser = require('body-parser');
var users = require('./routes/users');
var app = express();

app.use(bodyparser.json());

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

var server = app.listen(8081, function() {
  var port = server.address().port;
  console.log('Service listening on port %s', port);
});
