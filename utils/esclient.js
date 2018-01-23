'use strict';

var pe = process.env;
var elasticsearch = require('elasticsearch');
var Message = require('../model/message');
var eshost = pe.npm_package_config_eshost;

var esclient = new elasticsearch.Client({
  host: eshost
});

function processHits(results, res) {
  var message = new Message();
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
  var query = (req.query.id !== undefined && req.query.id.length !== 0) ? '{"query":{"match":{"_id":{"query":"' + req.query.id + '"}}}}' : '{"query":{"match_all":{}}}';
  esclient.search({ index: 'users', body: query }, function(err, result) {
    if (err || result.hits.total === 0) {
      var message = new Message();
      if (err) message.addErrorItem({ 'status': err.statusCode || 500, 'message': err });
      else message.addErrorItem({ 'status': 404, 'message': 'The requested resource could not be found' });
      res.status(message.errors[0].status).send(message);
    } else processHits(result.hits.hits, res);
  });
} exports.performESSearch = performESSearch;
