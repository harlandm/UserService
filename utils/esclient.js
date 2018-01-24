'use strict';

var pe = process.env;
var elasticsearch = require('elasticsearch');
var Message = require('../model/message');
var eshost = pe.npm_package_config_eshost;

var esclient = new elasticsearch.Client({
  host: eshost
});
var esindex = 'users';
var estype = 'user';

// ********************************************************************************
function performESIndex(req, res) {
  var message = new Message();
  esclient.index({ index: esindex, type: estype, body: {
    forename: req.body.forename,
    surname: req.body.surname,
    email: req.body.email,
    created: new Date()
  } }, function(error, response) {
    if (error) message.addErrorItem({ 'status': error.statusCode, 'message': response });
    else {
      message.addDataItem({ 'id': response._id });
      res.status(200).send(message);
    }
  });
} exports.performESIndex = performESIndex;
// ********************************************************************************
function processHits(results, res) {
  var message = new Message();
  console.log('hits = ' + JSON.stringify(results));
  for (var hit in results) {
    if (results.hasOwnProperty(hit)) {
      message.addDataItem({
        'id': results[hit]._id,
        'forename': results[hit]._source.forename,
        'surname': results[hit]._source.surname,
        'email': results[hit]._source.email,
        'created': results[hit]._source.created
      });
    }
  }
  res.status(200).send(message);
}

function performESSearch(req, res) {
  var query = (req.query.id !== undefined && req.query.id.length !== 0) ? '{"query":{"match":{"_id":{"query":' + req.query.id + '}}}}' : '{"query":{"match_all":{}}}';
  esclient.search({ index: esindex, body: query }, function(err, result) {
    if (err || result.hits.total === 0) {
      var message = new Message();
      if (err) message.addErrorItem({ 'status': err.statusCode || 500, 'message': err });
      else message.addErrorItem({ 'status': 404, 'message': 'The requested resource could not be found' });
      res.status(message.errors[0].status).send(message);
    } else processHits(result.hits.hits, res);
  });
} exports.performESSearch = performESSearch;
// ********************************************************************************

// ********************************************************************************
function performESDelete(req, res) {
  var message = new Message();
  if (req.query.id !== undefined && req.query.id.length !== 20) message.addErrorItem({ 'status': 400, 'message': 'Bad Request - id missing or wrong length' });
  else {
    esclient.delete({ index: esindex, type: estype, id: req.query.id }, function(error, response) {
      console.log('error 4 delete = ' + JSON.stringify(error));
      console.log('response 4 delete = ' + JSON.stringify(response));
      if (error) message.addErrorItem({ 'status': 500, 'message': response });
      else message.addDataItem({ 'data': response });
    });
  }
  console.log('message 4 delete = ' + JSON.stringify(message));
  res.status((message.errors !== undefined) ? 500 : 200).send(message);
} exports.performESDelete = performESDelete;
// ********************************************************************************
