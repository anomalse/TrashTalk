//serial
let arguments = process.argv;
//console.log(arguments[2])
const path = arguments[2];

const {SerialPort,ReadlineParser} = require('serialport');
const Readline = require('@serialport/parser-readline');
//const path =  '/dev/cu.usbmodem14101';
const baudRate = 9600;
const port = new SerialPort({ path, baudRate })
//let prev_s = "";
let notIn=true;



//socket server
const PORT = 5000;
const express = require('express');
const cors = require('cors');
const app = express();
let httpServer = require('http').createServer(app); 
 // create a server (using the Express framework object)
 let io = require('socket.io')(httpServer);


const fs = require('fs');
const fileUpload = require('express-fileupload');
//https://github.com/alexandrucancescu/node-vlc-client

app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send("It's working");
});


// for receiving images from react app

app.patch('/binary-upload', (req, res) => {
  console.log('got an upload')
    console.log(req)
  let s = req.pipe(fs.createWriteStream('./uploads/video/' + Date.now()+".mp4"));
  s.on('finish', function () { notIn =true; console.log("done"); res.send({ status: 'uploaded' });});
 
 
});

// make server listen for incoming messages
httpServer.listen(PORT, function () {
  console.log('listening on port:: ' + PORT);
})



//socket connection
io.on('connect', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  //let testObj = {test_a:"sabs",test_b:"elio"}
  socket.emit("JOIN_REQUEST_ACCEPTED","connect success")

  //outside of socket connection :) - for testing
const parser = new ReadlineParser()
port.pipe(parser)
parser.on('data', function(incoming){

    if(incoming.trim() ==="ON" && notIn===true){
   //send data to client
   console.log("hereee")
    io.emit("GOT_FLUSH","ON");
    notIn=false;
  }
 

  

})

 

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});