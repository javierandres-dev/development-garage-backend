import { config } from 'dotenv';
config({ path: './.env.test' });

export default {
  port: process.env.PORT,
  mongodbURL: process.env.MONGODB_URI,
};
