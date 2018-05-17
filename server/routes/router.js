import express from 'express';
const router = express.Router();
import { createJob, checkJobStatus, RedirecttoUrl } from "../util/api_util";

require('events').EventEmitter.prototype._maxListeners = 30;

// connects to our react frontend
router.get('/', (req, res) => {
});

// res.send('Why hello there');
// res.render('../../client/public/index.html');

// route for creating a new job
  router.get('/jobs/:id', (req, res) => {
    let id = req.params['id'];
    checkJobStatus(id, res);
  });

//route to create a job with the given url
  router.post('/jobs/:url', (req, res) => {
    console.log(req);
    let givenUrl = req.params['url'];
    createJob(givenUrl, res);
  }
);

//route to redirect you to requested page
  router.get('/redirect/:id', ((req, res) => {
    let id = req.params['id'];
    RedirecttoUrl(id, res);
    })
  );

// route to redirect back to home page
// just in case you type in something invalid
  router.get('/*', (req, res) => {
    res.redirect('/');
  });

export default router;
