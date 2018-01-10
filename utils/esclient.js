'use strict';

var pe = process.env;
var elasticsearch = require('elasticsearch');
var eshost = pe.npm_package_config_eshost;

var esclient = new elasticsearch.Client({
  host: eshost
});

esclient.search();
