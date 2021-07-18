import express from 'express';
import { router } from './routes';

export const server = express();

require('dotenv').config({ path: './.env.test' });

const port = process.env.PORT || 4001;

server.set('port', port);

server.use('/api_v1', router);

server.get('/', (req, res) => {
  res.json({ code: 200, text: 'OK', message: 'Start point success' });
});
