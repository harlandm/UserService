'use strict';

var emailRegex = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;

var ErrorItem = function(err) {
  this.status = err.status;
  this.message = err.message;
};

var Message = function(req) {
  this.status = undefined;
  this.data = undefined;
  this.errors = undefined;
  this.validateRequest(req);
};

Message.prototype.validateRequest = function(req) {
  if (!emailRegex.test(req.body.email)) this.addErrorItem({ 'status': '400', 'message': 'Bad Request - Invalid email' });
};

Message.prototype.setData = function(data) {
  this.success = true;
  this.data = data;
  this.errors = undefined;
};

Message.prototype.addDataItem = function(dataItem) {
  this.errors = undefined;
  this.success = true;
  if (!this.data) this.data = [];
  this.data.push(dataItem);
};

Message.prototype.addErrorItem = function(err) {
  this.data = undefined;
  this.success = false;
  if (!this.errors) this.errors = [];
  this.errors.push(new ErrorItem(err));
};

module.exports = Message;
