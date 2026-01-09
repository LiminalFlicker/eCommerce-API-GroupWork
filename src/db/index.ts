import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'online-shop'
    });
    console.log('\x1b[35mMongoDB connected via Mongoose\x1b[0m');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
