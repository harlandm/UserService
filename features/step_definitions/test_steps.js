/*
 *
 * Title:       test_steps.js
 * Description: Step definitions for the Scenarios.
 *
 * Copyright:   Copyright (c) 2016
 * Author:      Mark Harland
 *
 */
'use strict';

var request = require('request');

var npmpackage = require('../../package');

module.exports = function() {
  var response;

  this.When(/^I get the "([^"]*)" document$/, function(arg1, callback) {
    var host = npmpackage.config.host;
    var port = npmpackage.config.port;
    var uri = 'http://' + host + ':' + port + '/about';

    request(uri, function(error, resp, body) {
      if (!error && resp.statusCode === 200) {
        response = body;
        callback();
      } else {
        callback(new Error('an error occurred getting ') + uri + ' (status = ' + resp.statusCode + ')');
      }
    });
  });

  this.Then(/^I should get a JSON object with "([^"]*)" set to "([^"]*)"$/, function(arg1, arg2, callback) {
    if (typeof response === 'undefined') {
      callback(new Error('error with JSON object'));
    } else {
      var respJSON = JSON.parse(response);
      if (respJSON[arg1] === arg2) {
        callback();
      } else {
        callback(new Error('expected ' + arg2 + ' but received ' + respJSON[arg1] + '\n' + respJSON.user));
      }
    }
  });

/*
  this.When(/^I "([^"]*)" a user on the User Service with "([^"]*)"$/, function (arg1, arg2, callback) {
    var host = npmpackage.config.host;
    var port = npmpackage.config.port;
    var uri = 'http://' + host + ":" + port + '/' + arg1 + '?' + arg2;

    request(uri, function (error, resp, body) {
      if (!error && resp.statusCode == 200) {
        response = body;
        callback();
      } else {
        callback(new Error('an error occurred getting ') + uri + ' (status = ' + resp.statusCode + ')');
      }
    });
  });

  this.Then(/^I should get a JSON object with "([^"]*)" set to "([^"]*)"$/, function (arg1, arg2, callback) {
    if (typeof response == 'undefined') {
      callback(new Error('error with JSON object'));
    } else {
      var respJSON = JSON.parse(response);
      var bool = (arg2.toLowerCase() === 'true') ? true : false;
      if (respJSON[arg1] === bool) {
        callback();
      } else {
        callback(new Error('expected ' + arg2 + ' but received ' + respJSON[arg1] + '\n' + respJSON.user));
      }
    }
  });

  this.Then(/^"([^"]*)" should contain "([^"]*)"$/, function (arg1, arg2, callback) {
    if (typeof response == 'undefined') {
      callback(new Error('error with JSON object'));
    } else {
      var respJSON = JSON.parse(response);
      switch (typeof respJSON[arg1]) {
        case 'object':
          for (var attrib in respJSON[arg1]) {
            if (respJSON[arg1][attrib].indexOf(arg2) > -1) {
              callback();
            }
          }
          callback(new Error('expected ' + arg2 + ' but not found in ' + response));
          break;

        case 'string':
          var str = new String(respJSON[arg1]);
          if (str.indexOf(arg2) > -1) {
            callback();
          } else {
            callback(new Error('expected ' + arg2 + ' but received ' + respJSON[arg1]));
          }
          break;
      }
    }
  });
*/
};
