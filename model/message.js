'use strict';

var emailRegex = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/;

var ErrorItem = function(err) {
  this.code = err.status;
  this.message = err.message;
};

var Message = function(req) {
  this.data = [];
  this.errors = [];
  this.validateRequest(req);
};

Message.prototype.validateRequest = function(req) {
  if (!emailRegex.test(req.body.email)) this.addErrorItem({ code: 400, message: 'Bad Request' });
};

Message.prototype.setData = function(data) {
  this.data = data;
  this.errors = undefined;
};

Message.prototype.addDataItem = function(dataItem) {
  this.data.push(dataItem);
};

Message.prototype.addErrorItem = function(err) {
  this.data = undefined;
  if (!this.errors) this.errors = [];
  this.errors.push(new ErrorItem(err));
};

module.exports = Message;
