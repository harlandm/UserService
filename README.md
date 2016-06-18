# UserService
An API to manage a user persistence layer (CRUD)
## Installation
```
npm install
```
## Usage
```
npm start
```
## API Reference
- Create API: http<span/>://localhost.com/create?email=**_email_**&forename=**_forename_**&surname=**_surname_**  
**_email_** = email address of new user  
**_forename_** = forename of new user  
**_surname_** = surname of new user
- Read API: http<span/>://localhost:8081/read?userid=**_userid_**  
    - **_userid_** = the userid of the user you wish to find
- Update API: http<span/>://localhost.com/create??userid=**_userid_**&email=**_email_**&forename=**_forename_**&surname=**_surname_**  
    - **_userid_** = the userid of the user you wish to update (**mandatory**)  
    - **_email_** = email address of new user (**optional**)  
    - **_forename_** = forename of new user (**optional**)  
    - **_surname_** = surname of new user (**optional**) 
- Delete API: http<span/>://localhost.com/delete?userid=**_userid_**  
    - **_userid_** = the userid of the user you wish to delete  

All the APIs return:
    `{ "success": true/false, "user": string/user object }`  
USer Object:
    `{ "email": "**_email_**", "forename": "**_forename_**", "surname": "**_surname_**", "created": "**_dd mmm yyyy_**" }  

## Tests
To run the Cucumber tests:
```
npm test
```
## TODO  
To further enhance this example I would:
- log to a file rather than the console
- use a 'proper' database rather than the JSON object array I've used