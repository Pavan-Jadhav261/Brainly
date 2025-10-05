import mongoose, { model, Schema } from "mongoose";
import { MONGOOSE_CONNECTION } from "./config";
mongoose.connect(MONGOOSE_CONNECTION);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
});

export const userModel = model("users", userSchema);

const contentSchema = new Schema({
  title: String,
  type: String,
  link: String,
  userId: { type: mongoose.Types.ObjectId },
});
export const contentModel = model("contents", contentSchema);

const linkSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId },
  hash: { type: String, unique: true },
});

export const linkModel = model("links", linkSchema);
