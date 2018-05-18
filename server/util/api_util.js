import redis from "redis";
import kue from "kue";
import axios from "axios";
import validator from 'validator';

const client = redis.createClient();
const queue = kue.createQueue();

client.on('connect', () => {
  console.log('connected to Redis');
});

client.on('error',(err) => {
  console.log("Error " + err);
});

queue.on('error', (err) => {
  console.log( 'Kue Error: ', err );
});

const checkUrl = (url) => {
  if (validator.isURL(url)){
    return "http://" + url;
 } else {
   return null;
 }
};


export const createJob = (givenUrl, res) => {
  let data = checkUrl(givenUrl);
  if (data){
    let job = queue.create('job', data)
      .priority('critical')
      .removeOnComplete(false)
      .save( (err) => {
      if (!err){
        client.hset(job.id, data, 'none', redis.print);
        console.log(client.hget(job.id, 'data', (error, obj) => obj));
        res.send({
          url: 'The URL you submitted was: ' + givenUrl,
          message: 'Successfully created job. Your job ID is ' + job.id,
          });
      } else {
        res.send({
          message: "Sorry! We could not import your data. Please check your spelling and try again.",
          error: err}
        );
      }
    });
  } else {
    res.send({
      message: "Sorry! That's not a valid url. Please check your spelling and try again.",
      }
    );
  }

};

export const checkJobStatus = (id, res) => {
  client.hget(id, 'data', (err, obj) => {
    if (err) {
      res.send(err);
    } else if (!obj){
      res.send({message:"This key does not exist! Check your spelling or try a new key"});
    } else if (obj === 'none'){
      res.send({message:"Working on it! Check back in a minute or two."});
    } else {
      res.send({obj:obj});
    }
  });
};

const processRequest = (job, done) => {
  axios.get(job.data)
    .then((response) => {
      client.hset(job.id, 'data', response.data, redis.print);
      done();
    });
};

queue.watchStuckJobs(6000);

queue.process('job', 20, (job, done) => {
  processRequest(job, done);
});

// export const RedirecttoUrl = (id, res) => {
//   let apple = client.hget(id, 'data', (err, reqUrl) => {
//     if (err) {
//       res.status(400);
//     } else {
//       if (reqUrl === 'none') {
//         res.status(400);
//       } else {
//         res.send({obj:reqUrl});
//       }
//     }
//   });
// };
