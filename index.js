const http = require('http');
const express = require('express');
const app = express();

const server = require('./server/server')(app, express);

app.listen(8080);
