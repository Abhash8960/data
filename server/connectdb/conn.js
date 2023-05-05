import mongoose from 'mongoose';

export const ConnectDb = async () => {
  try {
    const url = process.env.MONGO_URL;
    const conn = await mongoose.connect(url);
    console.log(`Database Connected `);
  } catch (error) {
    console.log(`Database Not Connected `);
  }
};
