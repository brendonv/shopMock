var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

var path = require('path');

app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendfile('public/main.html');
});



server.listen(8081);