var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/tty.wchusbserialfa1410',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    socket.on('lights',function(data){
        
        console.log( data );
        
        port.write( data.status );
    
    });
    
});

app.listen(3000);
let input = document.querySelector(".inputBx input"),
     btn = document.querySelector(".inputBx .icon");
     icon = document.querySelector(".inputBx .icon i");

let SpeechRecognition = window.SpeechRecognition ||window.webkitSpeechRecognition ;
if (SpeechRecognition)
{
    console.log("supported");
    let recognition = new SpeechRecognition();
    //console.log("recognition");
    btn.addEventListener("click",()=>{
        if(icon.classList.contains('fa-microphone'))
        {
		   recognition.start();
        }
        else
        {
		 recognition.stop();
        }
    })
    recognition.addEventListener("start",()=>{
	    icon.classList.replace('fa-microphone','fa-microphone-slash');
	})
	recognition.addEventListener("end",()=>{
	    icon.classList.replace('fa-microphone-slash','fa-microphone');
	})
	recognition.addEventListener("result",(event)=>{
	    //console.log(event);
		let transcript = event.results[0][0].transcript;
		console.log(transcript);
		input.value = transcript;
		socket.emit('move', { "status":input.value });
	})
}
else
{
   console.log("not supported");
}

