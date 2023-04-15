//serial
const {SerialPort,ReadlineParser} = require('serialport');
const Readline = require('@serialport/parser-readline');
const path =  '/dev/cu.usbmodem14101';
const baudRate = 9600;
const port = new SerialPort({ path, baudRate })
let prev_s = "";

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

// //middle ware
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     safeFileNames: true,
//     preserveExtension: true,
//     tempFileDir: `${__dirname}/public/files/temp`
//   })
// );


app.patch('/binary-upload', (req, res) => {
  console.log('here')
    console.log(req)
  let s = req.pipe(fs.createWriteStream('./uploads/video/' + Date.now()+".mov"));
  s.on('finish', function () { console.log("done"); res.send({ status: 'uploaded' });});
 
 
});

// // //end point
// app.post('/upload', (req, res, next) => {
  
//   let uploadFile = req.files.video;
//   const name = uploadFile.name;
//   console.log(uploadFile)
//   //const md5 = uploadFile.md5();
//   const saveAs = `${name}.mp4`;

//     uploadFile.mv(`${__dirname}/uploads/video/${saveAs}`, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.status(200).json({ status: 'uploaded', name, saveAs });
//   });
// });

// make server listen for incoming messages
httpServer.listen(PORT, function () {
  console.log('listening on port:: ' + PORT);
})

//👇🏻 Add this before the app.get() block
io.on('connect', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  //let testObj = {test_a:"sabs",test_b:"elio"}
  socket.emit("JOIN_REQUEST_ACCEPTED","connect success")

  //set up serial connection::: 
  const parser = new ReadlineParser()
  port.pipe(parser)
  
  parser.on('data', function(incoming)
  {
    console.log(incoming);
  
    if(incoming.trim()!== prev_s) {
      console.log("once");
      console.log(incoming.trim())
    

      if(incoming.trim() ==="ON"){
    //   //send data to client
      //console.log("herer");
      io.emit("GOT_FLUSH","ON");
    }
     prev_s =incoming.trim();

    }
  })

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});
  //return res.status(200).json({ status: 'test123'})
//})
// console.log(uploadFile)
//   const name = uploadFile.name;
//   //const md5 = uploadFile.md5();
//   const saveAs = `${name}.mp4`;

  
//   uploadFile.mv(`${__dirname}/uploads/video/${saveAs}`, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.status(200).json({ status: 'uploaded', name, saveAs });
//   });
//});