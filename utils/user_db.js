/*
 *
 * Title:       user_db.js 
 * Description: Simple user db.
 * This should really be handed off to a real db,
 * but for the purpose of this exercise, will make do with 
 * a JSON array.
 * 
 * Copyright:   Copyright (c) 2016
 * Author:      Mark Harland
 * 
 */

var data = {
    "success": true,
    "user": ""
};

// 

var users = {};
var nextid = 0;

/*
  * createUser
  * -----
  * Adds user info to the key value array
  * 
  * input: email, forename & surname
  * output: true -> success = true & user record (with created date of now)
  * 		false->	success = false & user = error message
  */
function createUser(email, forename, surname) {
    var date = new Date();
    var user = { "email": email, "forename": forename, "surname": surname, "created": date };
    users[nextid.toString()] = user;
    var currentid = nextid;
    nextid++;
    return readUser(currentid);
}
exports.createUser = createUser;

/*
  * readUser
  * -----
  * Read user info from the key value array
  * 
  * input: userid
  * output: true -> success = true & user record
  * 		false->	success = false & user = error message
  */
function readUser(userid) {
    var user = users[userid];
    if (typeof user == 'undefined') {
        data.success = false;
        data.user = 'user with id ' + userid + ' could not be found';
    } else {
        data.success = true;
        data.user = user;
    }
    return data;
}
exports.readUser = readUser;


/*
  * updateUser
  * -----
  * Updates user info to the key value array
  * 
  * input: userid and updates (JSON array)
  * output: true -> success = true & user record
  * 		false->	success = false & user = error message
  */
function updateUser(userid, email, forename, surname) {
    var user = readUser(userid);
    if (user.success) {
        //  found the user, try to amend it
        if (typeof email == 'undefined' && typeof forename == 'undefined' && typeof surname == 'undefined') {
            data.success = false;
            data.user = "nothing to update";
            return data;
        } else {
            //  at least one field need updating
            if (typeof email != 'undefined') {
                //  update email field
                users[userid].email = email;
            }
            if (typeof forename != 'undefined') {
                //  update forename field
                users[userid].forename = forename;
            }
            if (typeof surname != 'undefined') {
                //  update surname field
                users[userid].surname = surname;
            }
        }
    }
    return readUser(userid);
}
exports.updateUser = updateUser;

/*
  * deleteUser
  * -----
  * Deletes a user from the key value array
  * 
  * input: userid
  * output: true -> success = true & user record = ""
  * 		false->	success = false & user = error message
  */
function deleteUser(userid) {
    var user = users[userid];
    if (typeof user == 'undefined') {
        data.success = false;
        data.user = 'user with id ' + userid + ' could not be found';
    } else {
        delete users[userid];
        data.success = true;
        data.user = "";
    }
    return data;
}
exports.deleteUser = deleteUser;