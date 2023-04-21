import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = (url: string) => {
  return mongoose.connect(url);
};
export default connectDB;
