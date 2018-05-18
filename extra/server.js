'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();


app.use(express.static(_path2.default.resolve(__dirname + '../../client')));
app.use('/', _router2.default);
var port = 3000 || process.env.PORT;

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});