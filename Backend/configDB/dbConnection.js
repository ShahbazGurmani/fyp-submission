import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected with DB at ${connect.connection.host}`.bgBlue);
  } catch (err) {
    console.log("Error in Connecting DB", err);
  }
};

export default connectDB;
