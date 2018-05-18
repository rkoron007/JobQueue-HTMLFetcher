const express = require('express');
const app = express();
import path from 'path';

import routes from './routes/router';

app.use(express.static(path.resolve(__dirname + '../../client')));
app.use('/', routes);
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
