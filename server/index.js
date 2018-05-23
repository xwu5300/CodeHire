const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const port = 8080;
const app = express();
const path = require('path');
const routes = require('./routes');

const jwt = require('jwt-simple');
const { secret } = require('../config.js').secret;

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


(function(){
let companyRooms = {};
io.sockets.on('connection', (socket)=> {
  
  // when candidates enter liveCoding, push their username/id into respective companyId obj parameter
  socket.on('candidate enter', (username, currentCompanyId) => {
    socket.room = 'room-' + currentCompanyId;
    socket.join(socket.room);
     
    if(!companyRooms[currentCompanyId]) {
      companyRooms[currentCompanyId] = [username];
    } else {
      if(!companyRooms[currentCompanyId].includes(username)) {
        companyRooms[currentCompanyId].push(username);
      }
    }

     io.sockets.in(socket.room).emit('active candidates', companyRooms[currentCompanyId]);   
  })


  socket.on('typing', (newValue, username)=> {
    console.log(newValue)
    io.sockets.emit('add char-' + username, newValue);
  })


  // When company enters challenge, send them all users in their room
  socket.on('company enter', (currentCompanyId) => {
    socket.room = 'room-' + currentCompanyId;
    socket.join(socket.room);

    io.sockets.in(socket.room).emit('active candidates', companyRooms[currentCompanyId]);
  })


  socket.on('candidate result', (username, result) => {
    io.sockets.emit('show result-' + username, result);
  })


/* ---------- Timer between company and candidate --------- */
  let countdown;
  let dur;
  socket.on('send time_limit', (duration) => { 
    dur = duration;
    let minutes;
    let seconds;
    let timer = duration * 60;

    countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timer--;

      io.sockets.emit('show time_limit', minutes, seconds);
    }, 1000);
  })


  socket.on('reset clock', () => {
    clearInterval(countdown);
    io.sockets.emit('clock was reset', dur)
  })


  // When candidate disconnects from room, remove username from company room
  socket.on('candidate disconnect', (username, currentCompanyId) => {
    
    socket.leave('room-' + currentCompanyId);

    if(companyRooms[currentCompanyId]) {
      if(companyRooms[currentCompanyId].includes(username)) {
        companyRooms[currentCompanyId].splice(companyRooms[currentCompanyId].indexOf(username));
      }
    }

    io.sockets.emit('active candidates', companyRooms[currentCompanyId]); 
  })
})
})();



app.use('/', routes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});


