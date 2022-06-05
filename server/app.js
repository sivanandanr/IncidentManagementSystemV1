var express = require('express');
var path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const { MONGODB_NAME,MONGODB_PORT,NODE_ENV,MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD } = require('./config/config');

var app = express();


// Connect to database via mongoose
const attemptMongooseConnection = require("./db_service/setup");

// this should match the name of the service specified for mongo image in ../docker-compose.yml
const mongoDbHost = "mongo";
// this should match what is specified in ../docker-compose.yml
const mongoDbPort = MONGODB_PORT;
const mongoDbName = MONGODB_NAME;
console.log(mongoDbHost);
console.log(mongoDbName);
console.log(mongoDbPort);
//test Connection
attemptMongooseConnection(mongoDbHost, mongoDbPort, mongoDbName);
app.use(function (req, res, next) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
  });
//app.use(cors());
app.use(express.json());
// app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Get routes
var indexRouter = require('./routes/index');
const incidentsRouter = require('./routes/incidents.routes');
const usersRouter = require('./routes/users-routes');
const projectsRouter = require('./routes/project-routes');


app.use('/', indexRouter);
app.use('/incidents', incidentsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

module.exports = app;
;