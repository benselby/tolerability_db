var Study = require('./models/study');

var async = require('async');
var mongoose = require('mongoose');

console.log('This is a test script');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('Connection: ' + db);
Study.count({}, function(err, count) {
                if (err)
                    console.log('oh shit there was an error');
                else {
                    console.log('Got count: ' + count); 
                }
            });
