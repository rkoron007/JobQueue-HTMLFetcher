'use strict';

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();

var port = 3000 || process.env.PORT;

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});