
## Overview
This project creates an RESTful API using Node's Kue and Redis to create a job queue for retrieving HTML.

![Demo Gif](https://media.giphy.com/media/fs6cnXON31uWoCjim8/giphy.gif)
### Built Using:
- Frontend: React
- Backend: Express, Node, and Redis.

### Before Running:
- `npm install` => installs all necessary packages
- `npm run build` => precompiles needed assets

#### Use 3 Seperate Terminal Windows for these Commands:
- `redis-server` => starts the database server
- `npm run dev` => uses webpack to bundle all files and transpile ES6
- `npm start` => starts the node server for development

- In your browser navigate to http://localhost:3001/ and have fun!


### How To Use:
Enter a valid url (don't forget the "www") and then that url will be stored in the job queue and you will be given a job queue id number. The HTML of the website you submitted will be collected once it reaches the top of the queue. To check on your job status or retrieve the resulting HTML you can enter the job queue id you were given.
