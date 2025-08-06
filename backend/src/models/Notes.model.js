import mongoose, { Schema, model } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
         },
  },
  { timestamps: true }
);

export const Notes = model("Notes", notesSchema);
