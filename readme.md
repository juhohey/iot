# IoT API

## About

This is an API for an IoT device project.
Runs node & mariadb inside containers.
See the Dockerfile for individual steps & additions for the container.

## Server

### About

Uses knex & mariadb and nodemon for reloading. 

#### General modules

General modules in `./server/bootstrap` are automatically loaded on process startup with `app, express` as params. 

#### API

Api routes in `./server/api` are automatically loaded on process startup with `app, knex`. 

#### Migrations
Latest - run `knex migrate:latest`

## Server without docker

### Running
run `npm run server` to run the dev server on localhost:8080.
