const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const port = 3000;
const app = express();
const path = require('path');
const routes = require('./routes');



app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.use('/', routes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
