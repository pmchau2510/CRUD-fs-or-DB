# express-mongo
- This is a test using the following technologies:
- [Express](http://expressjs.com/) for RESTful API

# Requirements

- CRUD

## Sample statement to execute

- GET User or by id

``` GET /user/read-all ```
``` GET /user/read?id= <id> ```

- POST User

``` POST {"firstname": "example", "lastname": "example", "age": N } /user/add ```

- PUT user by id

``` PUT /user/edit/:id ```

- DELETE user by id

``` DELETE /user/delete/:id ```

## Running
Install Dependencies
```npm install```

Start Server
```npm start```
