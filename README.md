# karlhafsa
IDK17 programming project using CYLON

Simple code that works on Arduino Micro, using Cylon.js

Using websocket to connect from browser at localhost:5000

To use:
First, you want to wire your arduino board accordingly, in this example, pin 3, 4 and 5 are used
After that is done, follow these steps:

1. $ npm install
2. run gord.exe file
3. run arduino editor, and upload "Standard Firmata" sketch under Examples>Firmata
4. $ gort scan serial ( shows your port the arduino is connected to)
5. $ gort arduino upload firmata COM7 (COM7 is the port I'm using, copy the result from gort scan serial and replace COM7, should be 
/dev/ + what port you got from scan serial to put in here)
6. $ npm start (starts a live-server at localhost:5000 and starts the 'robot' on the arduino
7. Go to localhost:5000 and start using.
Wire Arduino board accordingly to the pins in the app.js file,

You can now control the arduino board from localhost:5000




