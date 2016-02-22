// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://cloud9:123456@ds062438.mongolab.com:62438/yanyi1', function(err){
    if(err){
        console.log('connect to mongolab error!');
        console.log(err);
        
    }else{
        console.log('connect to mongolab success!');
    }
}); // connect to our database


// Models
var Bear     = require('./app/models/bear');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        console.log('hello bears.');
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        console.log('bear.name:' + bear.name);
        
        // save the bear and check for errors
        bear.save(function(err) {
            if (err){
                console.log('Bear not created, err:' + err);
                res.send(err);
            }
            console.log('Bear created!');
            
            res.json({ message: 'Bear created!' });
        });
    })
    
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err){
                res.send(err);
            }

            res.json(bears);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err){
                res.send(err);
            }
            
            if(bear == null){
                res.status(404);
                res.json({ message: 'Bear not exist!' });
                
            }else{
                res.json(bear);
            }
        });
    })
    
     // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err){
                res.send(err);
            }
            
            if(bear == null){
                res.status(404);
                res.json({ message: 'Bear not exist!' });
                
            }else{
                bear.name = req.body.name;  // update the bears info
    
                // save the bear
                bear.save(function(err) {
                    if (err){
                        res.send(err);
                    }
    
                    res.json({ message: 'Bear updated!' });
                });
            }

        });
    })
    
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err){
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });
    


    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
var port = process.env.PORT;
var host = process.env.IP;

app.listen(port, host, function(){
  console.log("Magic happens on host: " + host + " and port: " + port );
  console.log("make a rest api call to https://node-express-sample-shangoyanyi.c9users.io/api/ to try the settings");
});

