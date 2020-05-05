import express from 'express';
import path from 'path';

import * as apiController from './controllers/api';

const app = express();
const publicPath = path.join(__dirname, '../../dist');

app.use(express.static(publicPath));

app.get('/api/user/:id', apiController.getUser);
app.get('/api/user', apiController.getUser);

export default app;
