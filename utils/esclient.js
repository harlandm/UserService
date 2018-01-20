'use strict';

var pe = process.env;
var elasticsearch = require('elasticsearch');
var Message = require('../model/message');
var eshost = pe.npm_package_config_eshost;
//var query = '{"query":{"bool":{"must":[{"match":{"_id":{"query":"Rpp_z2ABAxpB461Ztd7k"}}}]}}}';
//var q = '{"query":{"bool":{"must":[{"match":{"_id":{"query":"Rpp_Z2ABAxpB461Ztd7k"}}}]}}}';


var esclient = new elasticsearch.Client({
  host: eshost
});

function processHits(results, res) {
  var message = new Message();
  console.log('res = ' + JSON.stringify(results));
  for (var hit in results) {
    if (results.hasOwnProperty(hit)) {
      message.addDataItem({ 'id': results[hit]._id,
        'forename': results[hit]._source.forename,
        'surname': results[hit]._source.surname,
        'email': results[hit]._source.email });
    }
  }
  res.status(200).send(message);
}

function performESSearch(query, res) {
  //esclient.search({ index: 'users'/*, body: query*/ }, function(err, result) {
  esclient.search({ index: 'users', body: query }, function(err, result) {
    if (err) {
      var message = new Message();
      message.addErrorItem({ 'status': err.statusCode || 500, 'message': err });
      res.status(500).send(message);
    } else processHits(result.hits.hits, res);
  });
} exports.performESSearch = performESSearch;
