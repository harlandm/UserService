/*
 *
 * Title:       userservice.js 
 * Description: Simple api to manage a user persistance layer.
 * 
 * Copyright:   Copyright (c) 2016
 * Author:      Mark Harland
 * 
 */

var express = require('express');
var app = express();

var npmpackage = require('./package');
var db = require('./utils/user_db');

var data = {
    "success": true,
    "user": ""
};

/*
  * blank
  * -----
  * A helper function to detect if a string is undefined or empty
  * 
  * input: str - the string to test
  * output: true if str is undefined or empty
  * 			  false if str not undefined and not empty
  */
function blank(str) { return !(str && str !== ''); }

//  setup the view engine
app.set('views', './views');
app.set('view engine', 'pug');

//  set the port number
app.set('port', npmpackage.config.port);


//  create the routes

//  simple route for about - displays name & version
app.get('/about', function(req, res, next) {
    console.log('in about');
    data.success = true;
    data.user = npmpackage.config.displayname + ' (Version ' + npmpackage.version + ')';
    res.json(data);
});

//  simple route for create, expects email, forename and surname passed on uri, ignores everything else
app.get('/create', function(req, res, next) {
    console.log('in create');
    var email = req.query.email;
    var forename = req.query.forename;
    var surname = req.query.surname;

    if (!blank(email) && !blank(forename) && !blank(surname)) {
        var status = db.createUser(email, forename, surname);
        data.success = status.success;
        data.user = status.user;        
    } else {
        data.success = false;
        data.user = 'must have email, forename and surname';
    }
    res.json(data);
});

//  simple route for read, expects userid on uri, ignores everything else
app.get('/read', function(req, res, next) {
    console.log('in read');
    var uid = req.query.userid;

    if (!blank(uid)) {
        var status = db.readUser(uid);
        data.success = status.success;
        data.user = status.user;        
    } else {
        data.success = false;
        data.user = 'must have userid';
    }
    res.json(data);
});

//  simple route for update, expects userid and any of email, forename or surname passed on uri, ignores everything else
app.get('/update', function(req, res, next) {
    console.log('in update');
    var uid = req.query.userid;
    var email = req.query.email;
    var forename = req.query.forename;
    var surname = req.query.surname;

    if (!blank(uid)) {
        var status = db.updateUser(uid, email, forename, surname);
        data.success = status.success;
        data.user = status.user;      
    } else {
        data.success = false;
        data.user = 'must have userid';
    }
    res.json(data);
});

//  simple route for delete, expects userid on uri, ignores everything else
app.use('/delete', function(req, res, next) {
    console.log('in delete');
    var uid = req.query.userid;

    if (!blank(uid)) {
        var status = db.deleteUser(uid);
        data.success = status.success;
        data.user = status.user;        
    } else {
        data.success = false;
        data.user = 'must have userid';
    }
    res.json(data);
});

//  start the app
var userservice = app.listen(app.get('port'), function () {
    console.log(npmpackage.config.displayname + '(version ' + npmpackage.version + ') listening on port ' + app.get('port'));
});