import express from 'express';
const router = express.Router();
import { createJob, checkJobStatus, RedirecttoUrl } from "../util/api_util";

import path from 'path';

require('events').EventEmitter.prototype._maxListeners = 30;

// connects to our react frontend through the html page.
router.get('/', (req, res) => {
  res.render('index.html');
});

// route for creating a new job
  router.get('/jobs/:id', (req, res) => {
    let id = req.params['id'];
    checkJobStatus(id, res);
  });

//route to create a job with the given url
  router.post('/jobs/:url', (req, res) => {
    let givenUrl = req.params['url'];
    createJob(givenUrl, res);
  }
);

// route to redirect back to home page
// just in case you type in something invalid
  router.get('/*', (req, res) => {
    res.redirect('/');
  });

export default router;
