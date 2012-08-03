var http = require('http');
var url = require('url');
var getaddress = process.argv[2] || 'http://localhost';
var times = process.argv[3] || 1;
var blastercaliber = process.argv[4] || 99;
http.globalAgent.maxSockets = blastercaliber;
var options = {
  host: url.parse(getaddress).hostname,
  port: url.parse(getaddress).port,
  path: url.parse(getaddress).path,
};

var reset, bold, magenta, red, green, cyan, blue, white;
reset = '\x1B[0m';
bold = '\x1B[1m';
red = '\x1B[31m';
green = '\x1B[32m';
magenta = '\x1B[35m';
cyan = '\x1B[36m';
blue = '\x1B[34m';
white = '\x1B[37m';


var startTime = Date.now();
console.log('\r\n'+ bold +' ,___  _    ____ ____ ___ ____ ____ ');
console.log(' ||__] |    |__| [__   |  |___ |__/');
console.log(' ||__] |___ |  | ___]  |  |___ |  \\ ');
console.log('  ' + cyan + '.\'.     .-.     .-.     .-.     .-.');
console.log(white + '01001' + blue + '\\' + white + '01001o0' + blue + '\\' + white + 'o01001o' + blue + '\\' + white + '1o01001' + blue + '\\' + white + '01001o0' + blue + '\\');
console.log(cyan + '\'     `-\'     `-\'     `-\'     `-\'');
console.log('}>=<{ Target : '+ white + options.host);
console.log(cyan + '}>=<{ Ammo   : '+ white + times);
console.log(cyan + '}>=<{ Caliber: '+ white + blastercaliber);
console.log('  ' + cyan + '.\'.     .-.     .-.     .-.     .-.');
console.log(white + '01001' + blue + '\\' + white + '01001o0' + blue + '\\' + white + 'o01001o' + blue + '\\' + white + '1o01001' + blue + '\\' + white + '01001o0' + blue + '\\');
console.log(cyan + '\'     `-\'     `-\'     `-\'     `-\'');
console.log(cyan + '\r\n}>=<{ ' + white + 'CHARGING CELLS');


function blaster(i) {
  
  var req = http.get(options, function(res) {
    if (i%100===0) {
      process.stdout.write(bold + cyan + '}>=<{ ' + white + 'Server returns fire: ' + green + 'STATUS ' + res.statusCode + '\r');
    }
    if (i==times){
      function ok() {
        console.log(cyan + '\r\n\r\n}>=<{ ' + white + 'Blasting lasted: ' + green + ((endTime - startTime)/1000) + ' s');
        console.log(cyan + '}>=<{ ' + white + 'OK!\r\n\r\n');
      };
      var endTime = Date.now();
      setTimeout(ok, (blastercaliber*15));
    }
  }).on('error', function(e) {
    console.log(red + '\r\n}>=<{ Critical hit: ' + white + e.message + '\r\n');
  });

  process.stdout.write(cyan + '}>=<{ ' + reset + i + ' out of ' + times + ' cells charged' + cyan + bold + ' }\r');

};

console.time('\r\n}>=<{ ' + white + 'Charging time'+green);
for (i=1;i<=times;i++) {
  blaster(i);
};
console.timeEnd('\r\n}>=<{ ' + white + 'Charging time'+green);

console.log(cyan + '\r\n}>=<{ ' +  white + 'Fully charged!\r\n' + cyan + '}>=<{ ' + white + 'Fire' + red + '!\r\n');
