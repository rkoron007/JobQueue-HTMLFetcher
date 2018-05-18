const express = require('express');
const app = express();
import path from 'path';

import routes from './routes/router';
// for routing our index.html
app.use(express.static(path.resolve(__dirname + '../../client')));

// connecting to our router
app.use('/', routes);
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
