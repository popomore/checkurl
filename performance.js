var fs = require('fs');
var async = require('async');
var checkurl = require('./lib/checkurl');

fs.readFile('./data', function(err, data) {
  var arr = data.toString().split(/\r\n|\r|\n/);

  async.series([
    function(callback){
      perform(arr.slice(0, 10));
      callback(null, 'next');
    },
    function(callback){
      perform(arr.slice(11, 50));
      callback(null, 'next');
    },
    function(callback){
      perform(arr.slice(50, 200));
      callback(null, 'next');
    },
    function(callback){
      perform(arr.slice(200, 500));
      callback(null, 'next');
    },
    function(callback){
      perform(arr.slice(500, 2000));
      callback(null, 'next');
    }
  ]);

});

function perform(arr) {
  var begin = new Date().getTime();
  checkurl(arr, function(err, data) {
    var end = new Date().getTime();
    console.log(arr.length + ' times, ' + (end - begin)/arr.length + ' ms/time');
  }).on('error', function(err){
    console.log(err);
  });
}