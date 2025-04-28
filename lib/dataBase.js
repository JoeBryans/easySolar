// mongoose connection
import mongoose from "mongoose";

const connection = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
