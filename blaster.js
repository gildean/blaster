var http = require('http');
var url = require('url');
var getaddress = process.argv[2] || 'http://localhost';
var times = process.argv[3] || 1;
var options = {
  host: url.parse(getaddress).hostname,
  port: url.parse(getaddress).port,
  path: url.parse(getaddress).path
};
console.log('\r\n');
console.log('*************************************');
console.log('*______________BLASTER______________*');
console.log('*************************************');
console.log('Every 1/100 request status is printed');
console.log('Usage: node blaster url timestoblast ');
console.log('\r\n');
function blaster() {
  var req = http.request(options, function(res) {

  }).on('error', function(e)
    {console.log("Got error: " + e.message);
  });
  
  req.end();
};

var i;
for (i = 0; i < times; i++) {
    if (i%100===0) {
        blaster();
        console.log('request batch ' + i / 100 + ' sent!');
    } else {
        blaster();
    }
};

