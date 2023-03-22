import { Schema, model, Types } from "mongoose";

const BulletinPostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 50,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    board: {
      type: String,
      required: [true, "Please select a board"],
    },
    anonymity: {
      type: Boolean,
      required: true,
      default: true,
    },
    likes: {
      type: [String],
      required: true,
      default: [],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BulletinPostComment",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdByUsername: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("BulletinPost", BulletinPostSchema);
