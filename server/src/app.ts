import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import apiRouter from './routers/api';

const app = express();
const publicPath = path.join(__dirname, '../../dist');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
