import mongoose from "mongoose";

const estimateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
    // required: true,
  },
});

//if model is not exist then create it
export const estimateModel =
  mongoose.models.estimate || mongoose.model("estimate", estimateSchema);

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
});

//if model is not exist then create it
export const userModel =
  mongoose.models.account || mongoose.model("account", userSchema);
