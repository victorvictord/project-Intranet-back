import mongoose, { mongo } from "mongoose";


const MONGO = process.env.MONGO_URL || 'mongodb://admin:admin@localhost:27017/intranetdb?authSource=admin';
console.log({MONGO});

export const connectDB = async () => {
  await mongoose.connect(MONGO);
  console.log("Mongo conectado");
};
