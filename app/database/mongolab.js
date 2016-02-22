var mongoose   = require('mongoose');

var mongolab = {
    connect: function(){
        var db = mongoose.connect('mongodb://cloud9:123456@ds062438.mongolab.com:62438/yanyi1', function(err){
            if(err){
                console.log('connect to mongolab error!');
                console.log(err);
                
            }else{
                console.log('connect to mongolab success!');
            }
        }); // connect to database
    }
}

module.exports = mongolab;