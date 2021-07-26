import { Schema, model } from "mongoose";

const logSchema = new Schema(
  { id: { type: Number, required: true } },
  { versionKey: false, timestamps: true }
);

export default model("Log", logSchema);
