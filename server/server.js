const express = require('express');
const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import routes from './routes/router';

const port = 3001 || process.env.PORT;

app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
