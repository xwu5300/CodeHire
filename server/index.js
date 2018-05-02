const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const port = 3000;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
