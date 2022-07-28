# control-servo-motor-by-voice
in this project I design webpage to control servo motor by voice 
in arduino.ino file I wrote code to handle with the word that come from web page 
if it is Right then the motor will rotate 0 degree
if it is Left then the motor will rotate 180 degree
Before we setup the Node.js server we need to know the name of the serialport your Arduino is attached to. 
You can find the name of your serialport, it will look something like /dev/tty.wchusbserialfa1410
in javascript file  I uses Socket.io to listen for a message from the HTML/JavaScript webpage and then simply passes on the message to the connected Arduino.

