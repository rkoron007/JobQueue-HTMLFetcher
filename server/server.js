const express = require('express');
const app = express();
import path from 'path';
import routes from './routes/router';

require('events').EventEmitter.defaultMaxListeners = 30;


// for routing our index.html
app.use(express.static(path.resolve(__dirname + '../../client')));

// connecting to our router
app.use('/', routes);
const port = 3001 || process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
