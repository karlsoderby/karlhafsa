"use strict";

var Cylon = require("cylon");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressWs = require('express-ws');

var ews = expressWs(express());
var app = ews.app;

var robot2 = Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM7' }
  },

  devices: {
    led1: { driver: 'led', pin: 3 },
    led2: { driver: 'led', pin: 4 },
    led3: { driver: 'led', pin: 5 },
    led4: { driver: 'led', pin: 6 }
  },


  /* This function dims LED1 up and down, and depending on what
     brightness value it has, it will light up LED2, LED3 & LED4
     in a synchronised fashion, before turning them off in the same way */
     
  work: function(my) {
    
      var brightness = 0,
          fade = 5;
          
          
          every(0.1.seconds(), function() {
            brightness += fade;
            my.led1.brightness(brightness);
            if ((brightness === 0) || (brightness === 255)) { fade = -fade; }
            if (brightness === 40) {my.led2.toggle();} 
            if (brightness === 190) {my.led2.turnOff();}
            if (brightness === 50) {my.led3.toggle();}
            if (brightness === 200) {my.led3.turnOff();}
            if (brightness === 60) {my.led4.turnOn();}
            if (brightness === 210) {my.led4.turnOff();}
          });
        }
      

    });

  
   robot2.start();  


  
    



app.ws('/ws', function (ws, req) {
  ws.on('message', function (msg) {
  

	

  
  robot2.work();
  	

  
    
  

    

    var clients = ews.getWss('/ws').clients;
    // Debug print it

    console.log(new Date().toLocaleTimeString() + '> ' + msg);

    // Broadcast it to all other clients
    clients.forEach(c => {
      c.send(msg);
    });
  });
});

//var expressWs = require('express-ws')(app);
app.use(require('middleware-static-livereload')({
  documentRoot: 'public/'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  if (err.status)
    res.sendStatus(err.status);
  else
    res.sendStatus(500);
});

let port = 5000;

app.listen(port);
console.log('Webserver started: http://localhost:' + port);
module.exports = app;



  
 
