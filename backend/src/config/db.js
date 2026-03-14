import mongoose from 'mongoose';

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed. Running with in-memory fallback.');
    console.warn(error.message);
    return false;
  }
}
