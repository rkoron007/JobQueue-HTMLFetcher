"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirecttoUrl = exports.checkJobStatus = exports.createJob = undefined;

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _kue = require("kue");

var _kue2 = _interopRequireDefault(_kue);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _redis2.default.createClient();
var queue = _kue2.default.createQueue();

client.on('connect', function () {
  console.log('connected to Redis');
});

client.on('error', function (err) {
  console.log("Error " + err);
});

queue.on('error', function (err) {
  console.log('Kue Error: ', err);
});

var checkUrl = function checkUrl(url) {
  if (_validator2.default.isURL(url)) {
    return "http://" + url;
  } else {
    return null;
  }
};

var createJob = exports.createJob = function createJob(givenUrl, res) {
  var data = checkUrl(givenUrl);
  if (data) {
    var job = queue.create('job', data).priority('critical').removeOnComplete(false).save(function (err) {
      if (!err) {
        client.hset(job.id, data, 'none', _redis2.default.print);
        console.log(client.hget(job.id, 'data', function (error, obj) {
          return obj;
        }));
        res.send({
          url: 'The URL you submitted was: ' + givenUrl,
          message: 'Successfully created job. Your job ID is ' + job.id,
          completed: false });
      } else {
        res.send({
          completed: false,
          message: "Sorry! We could not import your data. Please check your spelling and try again.",
          error: err });
      }
    });
  } else {
    res.send({
      success: false,
      message: "Sorry! That's not a valid url. Please check your spelling and try again."
    });
  }
};

var checkJobStatus = exports.checkJobStatus = function checkJobStatus(id, res) {
  client.hget(id, 'data', function (err, obj) {
    if (err) {
      res.send(err);
    } else if (!obj) {
      res.send({ message: "This key does not exist! Check your spelling or try a new key" });
    } else if (obj === 'none') {
      res.send({ message: "Working on it! Check back in a minute or two." });
    } else {
      res.send({ obj: obj });
    }
  });
};

var RedirecttoUrl = exports.RedirecttoUrl = function RedirecttoUrl(id, res) {
  var apple = client.hget(id, 'data', function (err, reqUrl) {
    if (err) {
      res.status(400);
    } else {
      if (reqUrl === 'none') {
        res.status(400);
      } else {
        res.send({ obj: reqUrl });
      }
    }
  });
};

var processRequest = function processRequest(job, done) {
  _axios2.default.get(job.data).then(function (response) {
    client.hset(job.id, 'data', response.data, _redis2.default.print);
    done();
  });
};

queue.watchStuckJobs(6000);

queue.process('job', 20, function (job, done) {
  processRequest(job, done);
});