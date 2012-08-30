var app = require('appjs')
  , http = require('http')
  , url = require('url');


app.serveFilesFrom(__dirname + '/content');


var window = app.createWindow({
  alpha: false,
  width: 800,
  height: 480,
  resizable: false,
  disableSecurity: true,
  icons: __dirname + '/content/icons'
});


window.on('create', function(){
  window.frame.show();
  window.frame.center();
  window.frame.opacity=0.92;
  window.frame.showChrome=1;
});


window.on('ready', function(){
  window.require = require;
  window.process = process;
  window.module = module;
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F12') {
      window.frame.openDevTools();
    }
  });
  
  var document = window.document;
  var $ = this.$,
      $target = $('input[name=target]'),
      $ammo = $('input[name=ammo]'),
      $caliber = $('input[name=caliber]'),
      $info = $('#info-target'),
      $label = $info.find('span'),
      $buttons = $('input, button'),
      $results = $('#resultsbox'),
      $placeholder = $('#placeholder'),
      $footer = $('#footer'),
      $footerlabel = $footer.find('span'),
      $error = $('#error'),
      $errorlabel = $error.find('span');
  $label.text('Select target and blast!');
  $footerlabel.text('blaster by: ok 2012');
 
  $('#blaster-form').submit(function(e){
    e.preventDefault();
    $placeholder.css('display', 'none');
    $label.text('Blasting!');
    $buttons.attr('disabled', true);
    var target = $target.val() || 'http://localhost',
      ammo = $ammo.val() || 100,
      caliber = $caliber.val() || 100;
    http.globalAgent.maxSockets = caliber;
    var options = {
      host: url.parse(target).hostname,
      port: url.parse(target).port,
      path: url.parse(target).path
    };
    $('<h2>Blasted: ' + target + ' ' + ammo + ' times</h2>').appendTo($results);
    var startTime = Date.now();
  
    for(var i = 1; i <= ammo; i += 1) {
      blaster(i);
    };

    function blaster(i) {
      var req = http.get(options, function(res) {
        if (i%100===0) {
          $('<p>Request: ' + i + ' STATUS: ' + res.statusCode + '</p>').appendTo($results);
          $footerlabel.text('Blasting: ' + ((i/ammo)*100).toFixed(1) + ' %');
        }
        if (i == ammo) {
          var endTime = Date.now();
          var blastTime = (endTime - startTime)/1000;
          blastedOut(blastTime);
        }
      }).on('error', function(e) {
        $('<p>Request: ' + i + ' ERROR: ' + e.message + '</p>').appendTo($results);
        if (i == ammo) {
          var endTime = Date.now();
          var blastTime = (endTime - startTime)/1000;
          $errorlabel.text('ERROR! ERROR! ERROR!');
          blastedOut(blastTime);
        }
      });
    };
  });

  function blastedOut(blastTime){
    $label.text('Ceasefire called');
    $buttons.attr('disabled', false);
    var blasttimer = function(blastTime) {
      $footerlabel.text('Blasting lasted: ' + blastTime.toFixed(1) + ' s');
    };
    setTimeout(blasttimer(blastTime), 1000);
  };

});
