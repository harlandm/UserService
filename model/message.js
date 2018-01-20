'use strict';

var validator = require('validator');

var ErrorItem = function(err) {
  this.status = err.status;
  this.message = err.message;
};

var Message = function(req) {
  this.status = undefined;
  this.data = undefined;
  this.errors = undefined;
  if (req) this.validateRequest(req);
};

Message.prototype.validateRequest = function(req) {
  if (!req.body.forename || req.body.forename.lenght === 0) this.addErrorItem({ 'status': '400', 'message': 'Bad Request - Invalid forename' });
  if (!req.body.surname || req.body.surname.lenght === 0) this.addErrorItem({ 'status': '400', 'message': 'Bad Request - Invalid surname' });
  if (!req.body.email || !validator.isEmail(req.body.email)) this.addErrorItem({ 'status': '400', 'message': 'Bad Request - Invalid email' });
};

Message.prototype.addDataItem = function(dataItem) {
  this.errors = undefined;
  this.success = 'true';
  if (!this.data) this.data = [];
  this.data.push(dataItem);
};

Message.prototype.addErrorItem = function(err) {
  this.data = undefined;
  this.success = 'false';
  if (!this.errors) this.errors = [];
  this.errors.push(new ErrorItem(err));
};

module.exports = Message;
