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

// Create
router.post('/', function(req, res, next) {
  console.log('POST - %s', JSON.stringify(req.body, 2));
  res.status(201).send('{okay}');
  // 200, 409
});

// Read
router.get('/', function(req, res, next) {
  console.log('READ - %s', req.originalUrl);
  res.status(200).send('{user:"Mark"}');
  // 404, 400???
});

// Update
router.put('/', function(req, res, next) {
  console.log('PUT - %s', JSON.stringify(req.body, 2));
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