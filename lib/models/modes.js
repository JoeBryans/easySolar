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
