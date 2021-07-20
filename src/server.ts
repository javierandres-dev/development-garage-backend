import express from 'express';
import { router } from './routes';
import config from './config';
const cors = require('cors');
const morgan = require('morgan');

export const server = express();

const port = config.port || 4001;

server.set('port', port);

server.get('/', (req, res) =>
  res.status(200).json({ message: 'Start point success' })
);

const corsOptions = {};
server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api_v1', router);
