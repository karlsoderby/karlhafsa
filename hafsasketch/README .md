


## Wiring Arduino board
To use:  wire your arduino board in  pin  5 are used on the Arduino board, which has a led plugged 



## Github
This complete package can be found at github under https://github.com/karlsoderby/karlhafsa

## Installation

$ npm install

run gord.exe file

run arduino editor, and upload "Standard Firmata" to your arduino board  (sketch under Examples>Firmata>StandardFirmata)

$ gort scan serial ( shows your port the arduino is connected to)

$ gort arduino upload firmata COM7 (COM7 is the port I'm using, copy the result from gort scan serial and replace COM7, should be /dev/ +
what port you got from scan serial to put in here if using a Mac)

## Using gort on Mac
(For Mac users, please visit http://gort.io/documentation/getting_started/downloads/ to download gort for Mac, and replace the current gort.exe file that currently exists in this folder, or use the one that I included in the /gort for mac/gort.exe)

## Starting it up
$ npm start (starts a live-server at localhost:5000 and starts the 'robot' on the arduino.

Go to localhost:5000 and start controlling the lights on the board. Make sure the Arduino is wired properly and that each LED 

You can now control the arduino board from localhost:5000

