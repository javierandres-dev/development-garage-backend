import { config } from 'dotenv';
config({ path: './.env' });

export default {
  port: process.env.PORT || 4000,
  mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/garage',
};
