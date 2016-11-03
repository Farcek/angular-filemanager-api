var express = require('express');
var morgan = require('morgan');

var app = express();

var afma = require('../dist/main');

app.use(morgan('dev'));
app.use(function middleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.status(200).end();
  } else {
    next();
  }
})

app.use('/api', afma.factory({
  rootDir: '/home/puje/files/'
}));

app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
});
