/*
 *
 * Title:       about.js
 * Description: Simple api to display service version info.
 *
 * Copyright:   Copyright (c) 2018
 * Author:      Mark Harland
 *
 */
'use strict';

var express = require('express');
var router = express.Router();
var npmpackage = require('../package');
var Message = require('../model/message');

/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }]*/
router.get('/', function(req, res, next) {
  var message = new Message();
  message.addDataItem({ 'name': npmpackage.config.displayname, 'version': npmpackage.version, 'about': npmpackage.description });
  res.status(200).send(message);
});

module.exports = router;
