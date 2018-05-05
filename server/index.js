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

io.sockets.on('connection', (socket)=> {
  socket.on('typing', (newValue, e)=> {
    io.sockets.emit('add char', newValue)
  })
})

app.use('/', routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});
