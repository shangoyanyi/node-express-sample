// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

// DB connection
var db = require('./app/database/mongolab');
db.connect();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
// setup middlewares
var middleware = require('./app/routers/middleware');
app.use('/*', middleware);

// setup routers
var defaultRouter = require('./app/routers/defaultRouter');
var bearRouter = require('./app/routers/bearRouter');
app.use('/api', defaultRouter);
app.use('/api/bears', bearRouter);


// START THE SERVER
// =============================================================================
var port = process.env.PORT;
var host = process.env.IP;

app.listen(port, host, function(){
  console.log("Magic happens on host: " + host + " and port: " + port );
});

