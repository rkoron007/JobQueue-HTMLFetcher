'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api_util = require('../util/api_util');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


require('events').EventEmitter.prototype._maxListeners = 30;
// connects to our react frontend


router.get('/', function (req, res) {
  res.render('index.html');
});
// res.render('../../client/index.html');
// app.use(express.static(__dirname + 'client/index.html'));


// route for creating a new job
router.get('/jobs/:id', function (req, res) {
  var id = req.params['id'];
  (0, _api_util.checkJobStatus)(id, res);
});

//route to create a job with the given url
router.post('/jobs/:url', function (req, res) {
  var givenUrl = req.params['url'];
  (0, _api_util.createJob)(givenUrl, res);
});

//route to redirect you to requested page
router.get('/redirect/:id', function (req, res) {
  var id = req.params['id'];
  (0, _api_util.RedirecttoUrl)(id, res);
});

// route to redirect back to home page
// just in case you type in something invalid
router.get('/*', function (req, res) {
  res.redirect('/');
});

exports.default = router;