/*
 *
 * Title:       users.js
 * Description: Simple api to manage a user persistance layer.
 *
 * Copyright:   Copyright (c) 2018
 * Author:      Mark Harland
 *
 */
'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../model/message');

// Create
router.post('/', function(req, res, next) {
  var message = new Message(req);
  if (!message.status && message.errors !== undefined) {
    res.status(message.errors[0].status).send(message);
  } else {
    message.addDataItem({ 'id': '1', 'forename': 'Test', 'surname': 'Tester', 'email': 'test.tester@somewhere.com' });
    res.status(201).send(message);
  }
  // 200, 409
});

// Read
router.get('/', function(req, res, next) {
  //var uid = req.query.uid;
  console.log('READ - %s', req.originalUrl);
  res.status(200).send('{user:"Mark"}');
  // 404, 400???
});

// Update
router.put('/', function(req, res, next) {
  console.log('UPDATE - %s', JSON.stringify(req.body, 2));
  res.status(200).send('{okay}');
  // 201 if new, 204
});

// Delete
router.delete('/', function(req, res, next) {
  console.log('DELETE - %s', JSON.stringify(req.body, 2));
  res.status(200).send('{okay}');
  // 202?, 404
});

module.exports = router;
