var http = require('http')
  , url = require('url')
  , getaddress = process.argv[2] || 'http://localhost'
  , times = process.argv[3] || 100
  , blastercaliber = process.argv[4] || 100
  , reset = '\x1B[0m'
  , bold = '\x1B[1m'
  , red = '\x1B[31m'
  , green = '\x1B[32m'
  , cyan = '\x1B[36m'
  , blue = '\x1B[34m'
  , white = '\x1B[37m'
  , options = {
      host: url.parse(getaddress).hostname,
      port: url.parse(getaddress).port,
      path: url.parse(getaddress).path,
    };

// caliber sets the max sockets used for pooling requests
http.globalAgent.maxSockets = blastercaliber;


// some cool ascii-art
console.log('\r\n\r\n'+ bold +' ,___  ,_    ,____ ,____ ,____, ,____ ,____ ');
console.log(' ||__] ||    ||__| |[__    ||   ||___ ||__/');
console.log(' ||__] ||___ ||  | ___|]   ||   ||___ ||  \\ ');
console.log('  ' + cyan + '.\'.     .-.     .-.     .-.     .-.     .-.');
console.log(white + '01001' + blue + '\\' + white + '01001o0' + blue + '\\' + white + 'o01001o' + blue + '\\' + white + '1o01001' + blue + '\\' + white + '01001o0' + blue + '\\' + white + '01001o0' + blue + '\\');
console.log(cyan + '\'     `-\'     `-\'     `-\'     `-\'     `-\'');
console.log(reset + cyan + '}>=<{' + bold + '  Target   ' + reset + cyan +  '}>=<{' + white + ': ' + bold + options.host);
console.log(reset + cyan + '}>=<{' + bold + '  Ammo     ' + reset + cyan +  '}>=<{' + white + ': ' + bold + times);
console.log(reset + cyan + '}>=<{' + bold + '  Caliber  ' + reset + cyan +  '}>=<{' + white + ': ' + bold + blastercaliber);
console.log(cyan + '-.     .-.     .-.     .-.     .-.     .-.');
console.log(white + 'o0' + blue + '\\' + white + 'o01001o' + blue + '\\' + white + '1o01001' + blue + '\\' + white + '01001o0' + blue + '\\' + white + '01001o0' + blue + '\\'+ white + '01001o0'+ blue + '\\'+ white + '01o');
console.log(cyan + '   `-\'     `-\'     `-\'     `-\'     `-\'     `-\'');


// print out the message for the first tick loop and save cursor location
process.stdout.write(reset + cyan + '\r\n\r\n}>=<{ ' + white + bold + ' Charging cells   \x1B[s');

// mark the first tick loop start time
console.time(reset + cyan + '\r\n}>=<{ ' + white + bold + ' Charging time    ' + reset + cyan + '}>=<{' + green + bold);
// print out the counter on the first tick marking pooling of the connections
// fire the requests on the second tick
for (var i=1;i<=times;i++) {
  process.stdout.write(reset + cyan + '\x1B[u}>=<{' + white + ': ' + ((i/times)*100).toFixed(1) + ' %\r');
  blaster(i);
};
// mark the end of the first tick loop
console.timeEnd(reset + cyan + '\r\n}>=<{ ' + white + bold + ' Charging time    ' + reset + cyan + '}>=<{' + green + bold);

// the request function wrapped in a closure
function blaster(i) {
  // pick up the saved cursor position and show the counter on first tick loop
  // the request which returns callback on second tick loop
  http.get(options, function(res) {
    if (i==times) {
      process.nextTick(endmessage);
    }
    // print out all error messaages  
  }).on('error', function(e) {
    console.log(reset + cyan + '\r\n}>=<{ ' + red + bold +  ' Critical hit    ' + reset + cyan + '}>=<{' + reset + ': ' + white + bold + e.message + '\r\n');
  });

};

// ending message
function endmessage() {
  // mark the end of blasting
  var endTime = Date.now();
  console.log(reset + cyan + '\r\n\r\n\r\n\r\n}>=<{ ' + white + bold + ' Blasting lasted  ' + reset + cyan + '}>=<{' + reset + ': ' + green + bold + ((endTime - startTime)/1000).toFixed(1) + ' s');
  console.log(reset + cyan + '\r\n}>=<{ ' + white + bold + ' Ceasefire        ' + reset + cyan + '}>=<{\r\n\r\n' + reset);
};

// print out a message when pooling is done and firing will commence
process.stdout.write(reset + cyan + '\r\n\r\n}>=<{ ' +  white + bold + ' Fully charged!   ' + reset + cyan + '}>=<{' + reset + ': ' + red + bold + 'Fire!\r\n\r\n');

// mark the start of blasting
var startTime = Date.now();
