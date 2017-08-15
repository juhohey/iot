# IoT API

## About

This is an API for an IoT device project.
Runs node & sqlite and a client. 

## Todo

- Client sidebar
- Client commands
- User view
- Tests form models
- Test for the API
- Unit & E2E tests for the client

## Server

### About

Uses knex & sqlite and nodemon for reloading. 

#### General modules

General modules in `./server/bootstrap` are automatically loaded on process startup with `app, express` as params. 

#### API

Api routes in `./server/api` are automatically loaded on process startup with `app, knex`. 


#### Building

run `npm install && npm migrate` and run the server with nodemon `npm run server`.


## Client

### About

Admin panel for monitoring & interacting with the devices added to the app. Separate rollup build for login. Uses React & Redux but not React-Redux. 

### Developing

run `npm run rollup` to run the client (admin) (React / css)  
run `npm run login` to login  
run `npm run watch-css` to build the master css file  

## Before pushing to the server
There's no node-sass bindings for node 8 debian so the client can't be compiled on the server. For this reason we're doing the compiling on development machines. Run `npm run build` to compile build files to ./compiled as the server will use these before I replace node-sass with postcss. 

## Migrations
Latest - run `npm run migrate`

## Development env scripts
run ./scripts/create-admin.js to create an admin user. 

## Running
run `npm run server` to run the dev server on localhost:8080.
run `npm start` on the actual server, and `npm run restart` to get static assets & restart. 

### Testing
run `npm run test` to run unit tests with ava

# The API


#### List all
GET `/api/v1/readings`
returns all readings. 


#### List latests
GET `/api/v1/readings/latest`
returns latest 100 readings. 

#### Insert
PUT `/api/v1/readings`
```
body:
{
 timestamp: UNIX timestamp,
 payload: JSON payload
}
example
{
    "timestamp": "1502130278196",
    "payload": {"temperature":"20 C"}
}
```
returns the inserted item.

#### Delete all
DELETE `/api/v1/readings`
returns the amount deleted.

#### List single
GET `/api/v1/readings/:id`
Where :id is the row id of the item, i.e   
GET `/api/v1/readings/1`.
returns the item if found. 

#### Update single
POST `/api/v1/readings/:id`
body is the same as in an insert query, but there must be an id field in the URL.
```
body:
{
 payload: JSON payload
}
```

#### Delete single
DELETE `/api/v1/readings/:id`
id field in the URL. 
returns the amount deleted (1)
