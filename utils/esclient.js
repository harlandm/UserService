'use strict';

var pe = process.env;
var elasticsearch = require('elasticsearch');
var Message = require('../model/message');
var eshost = pe.npm_package_config_eshost;
//var query = '{"query":{"bool":{"must":[{"match":{"_id":{"query":"Rpp_z2ABAxpB461Ztd7k"}}}]}}}';
var q = '{"query":{"bool":{"must":[{"match":{"_id":{"query":"Rpp_Z2ABAxpB461Ztd7k"}}}]}}}';


var esclient = new elasticsearch.Client({
  host: eshost
});

//function process

function performESSearch(query, res) {
  var message = new Message();
  //esclient.search({ index: 'users'/*, body: query*/ }, function(err, result) {
  esclient.search({ index: 'users', body: query }, function(err, result) {
    if (err) message.addErrorItem({ 'status': err.statusCode || 500, 'message': err });
    else message.addDataItem(result.hits);
    res.status((message.errors) ? message.errors[0].status : 200).send(message);
  });

} exports.performESSearch = performESSearch;
