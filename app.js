var app = require('appjs')
  , http = require('http')
  , url = require('url');


app.serveFilesFrom(__dirname + '/content');


var window = app.createWindow({
  width: 800,
  height: 480,
  resizable: true,
  disableSecurity: true,
  icons: __dirname + '/content/icons'
});


window.on('create', function(){
  console.log("Window Created");
  window.frame.show();
  window.frame.center();
  window.frame.opacity=0.92;
  window.frame.showChrome=1;
});


window.on('ready', function(){
  console.log("Window Ready");
  window.require = require;
  window.process = process;
  window.module = module;
  var document = window.document;
  var $ = this.$,
      $target = $('input[name=target]'),
      $ammo = $('input[name=ammo]'),
      $caliber = $('input[name=caliber]'),
      $info = $('#info-target'),
      $label = $info.find('span'),
      $buttons = $('input, button'),
      $results = $('#resultsbox');
      $placeholder = $('#placeholder');
 $label.text('Select target and blast!');

 $('#blaster-form').submit(function(e){
    e.preventDefault();
    $label.text('Blasting!');
    $buttons.attr('disabled', true);
    var target = $target.val() || 'http://localhost',
      ammo = $ammo.val() || 100,
      caliber = $caliber.val() || 100;
    console.log(ammo + ' ' + caliber + ' ' + target);
    http.globalAgent.maxSockets = caliber;
    var options = {
      host: url.parse(target).hostname,
      port: url.parse(target).port,
      path: url.parse(target).path
    };
  var Data={};
  var Status=new Array(); 
  Status.push('<h2>Blasted: ' + target + ' ' + ammo + ' times</h2>');
  var startTime = Date.now();
  
  for(var i = 1; i <= ammo; i++) {
    blaster(i);
  };

  function blaster(i) {
    var req = http.get(options, function(res) {
      if (i%100===0) {
        Status.push('Request: ' + i + ' STATUS: ' + res.statusCode);
      }
      if (i == ammo) {
         var endTime = Date.now();
         var blastTime = (endTime - startTime)/1000;
         Data=JSON.stringify(Status);
         Data=eval(Data).join(",")
         Data= Data.replace(/,/g,'<p>');
         blastedOut(Data, blastTime);
      }
     }).on('error', function(e) {
      Status.push('Request: ' + i + ' ERROR: ' +  e.message);
      if (i == ammo) {
         var endTime = Date.now();
         var blastTime = (endTime - startTime)/1000;
         Data=JSON.stringify(Status);
         Data=eval(Data).join(",")
         Data= Data.replace(/,/g,'<p>');
         blastedOut(Data, blastTime);
       }
    });
  };
});

  function blastedOut(Data, blastTime){
    $label.text('Blasting lasted: ' + blastTime.toFixed(1));
    $results.html(Data);
    $buttons.attr('disabled', false);
  };

});
