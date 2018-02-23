
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

//Defines robot's attributes and functions

var robot2 = Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM7' }//'/dev/cu.usbmodem1421'
  },

  devices: {
    led1: { driver: 'led', pin: 3 },
    led2: { driver: 'led', pin: 4 },
    led3: { driver: 'led', pin: 5 }
  },
//A series of functions that will turn a led on and off from the browser
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
	
//This functions activate a led for 30 seconds, then turns it off
    work3: function(my) {

      this.led3.turnOn();
      after((30).seconds(), this.led3.turnOff);
      

    },

    work4: function(my) {

     this.led3.turnOn();
     
  
      }

    });

  //Starts the robot when live server is started
   robot2.start();  


  
    


//recieves a message from the browser and if text matches, triggers a function in the robot
app.ws('/ws', function (ws, req) {
  ws.on('message', function (msg) {
  

	
// A series of if statements waiting for browser to make a request
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



  
 
