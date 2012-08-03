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


function blaster(i) {
  
  var req = http.request(options, function(res) {
    if (i%100===0) {
      console.log('Blasted server answered with: STATUS ' + res.statusCode);
    }
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  req.end();
  
  if (i%100===0) {
    console.log('*pew* *pew* (' + i + ' shots taken)');
  }

};


for (i=1;i<=times;i++) {
    blaster(i);
};


console.log('\r\nOut of ammo!\r\n');
