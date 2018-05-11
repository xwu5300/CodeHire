const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const port = 8080;
const app = express();
const path = require('path');
const routes = require('./routes');

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));



let companyRooms = {};

io.sockets.on('connection', (socket)=> {
  
  // when candidates enter liveCoding, push their username/id into respective companyId obj parameter
  socket.on('candidate enter', (username, userId, currentCompanyId) => {
    socket.room = 'room-' + currentCompanyId;
    socket.join(socket.room);
    
    
    if(!companyRooms[currentCompanyId]) {
      companyRooms[currentCompanyId] = [[username, userId]];
    } else {
      if(!companyRooms[currentCompanyId].includes([username, userId])) {
        companyRooms[currentCompanyId].push([username,userId]);
      }
    }

     io.sockets.in(socket.room).emit('active candidates', companyRooms[currentCompanyId]);
   
  })


  socket.on('typing', (newValue, e, userId)=> {
    console.log(userId + ' is typing');
    io.sockets.emit('add char-' + userId, newValue);
  })


  // When company enters challenge, send them all users in their room
  socket.on('company enter', (currentCompanyId) => {
    console.log('company', currentCompanyId);

    socket.room = 'room-' + currentCompanyId;
    socket.join(socket.room);
    io.sockets.in(socket.room).emit('active candidates', companyRooms[currentCompanyId]);
  })


  // When candidate disconnects from room, remove username from company room
  socket.on('candidate disconnect', (username, userId, currentCompanyId) => {
    
     socket.leave('room-' + currentCompanyId);
     
     if(companyRooms[currentCompanyId]) {
     if(!companyRooms[currentCompanyId].includes([username, userId])) {
       companyRooms[currentCompanyId].splice(companyRooms[currentCompanyId].indexOf([username, userId]));
     }
   }
      io.sockets.emit('active candidates', companyRooms[currentCompanyId]); 
  })


  socket.on('send time_limit', (minutes, seconds) => {
    io.sockets.in(socket.room).emit('show time_limit', minutes, seconds);
  })

})



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


