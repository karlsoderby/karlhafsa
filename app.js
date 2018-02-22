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
    led3: { driver: 'led', pin: 5 }
  },

  toggle: function(my) 
  {
    this.led1.turnOn();
   
  },

  work: function(my) 
  
    {

   this.led1.turnOff();

      },

      work1: function(my) 
  
    {

      this.led2.turnOn();

    },

    work2: function(my) 
  
    {

      this.led2.turnOff();

    },

    work3: function(my) {

      this.led3.turnOn();
      after((30).seconds(), this.led3.turnOff);
      

    },

    work4: function(my) {

     this.led3.turnOn();
     
  
      }

    });

  
   robot2.start();  


  
    



app.ws('/ws', function (ws, req) {
  ws.on('message', function (msg) {
  

	

  if(msg =="lamp2"){
  robot2.work();
  }	

  if(msg =="lamp"){
    robot2.toggle();
    }	
  
    if(msg =="lamp3"){
      robot2.work1();
      }	
    
      if(msg =="lamp4"){
        robot2.work2();
        }	

        if(msg =="lamp5"){
          robot2.work3();
          }	

          if(msg =="lamp6"){
            robot2.work4();
            }	
    
  

    

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



  
 
