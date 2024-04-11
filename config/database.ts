import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  //  if db already connected no need to connect again
  if (connected) {
    console.log("DB already connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("connected");
      connected = true;
    } catch (error) {
      console.log("connection error : ", error);
    }
  }
};

export default connectDb;
