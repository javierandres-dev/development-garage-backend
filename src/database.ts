import mongoose from 'mongoose';
import config from './config';

const url: any = config.mongodbURL;

export const database = async () => {
  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.info(`Connected to database: ${db.connection.name}`);
  } catch (err) {
    console.error('Not connected to database.  Error: ', err);
  }
};
