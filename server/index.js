var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
