var express = require('express');
var router = express.Router(); 


// Model
var Bear = require('../models/bear');


// routes that end in /api/bears
// ----------------------------------------------------
router.route('/')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err){
                res.send(err);
            }

            res.json(bears);
        });
    })
    
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err){
                console.log('Bear not created, err:' + err);
                res.send(err);
            }
            console.log('Bear created!');
            
            res.json({ message: 'Bear created!' });
        });
    });

// on routes that end in /api/bears/:bear_id
// ----------------------------------------------------
router.route('/:bear_id')
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

module.exports = router;