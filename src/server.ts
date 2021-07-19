import express from 'express';
import { router } from './routes';
import config from './config';

export const server = express();

const port = config.port || 4001;

server.set('port', port);

server.use(express.json());
server.use('/api_v1', router);

server.get('/', (req, res) => {
  res.json({ code: 200, text: 'OK', message: 'Start point success' });
});
