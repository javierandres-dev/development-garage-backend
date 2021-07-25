import mongoose from 'mongoose';
import config from './config';

export const database = async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    if (db.connection.name)
      console.info(`Connected to database: ${db.connection.name}`);
    else throw new Error('Not connected to database');
  } catch (err) {
    console.error(err);
  }
};
