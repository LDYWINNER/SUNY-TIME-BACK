import { Schema, model, Types } from "mongoose";

const BulletinPostComment = new Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

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
      type: [Types.ObjectId],
      required: true,
      default: [],
    },
    comments: {
      type: [BulletinPostComment],
      required: true,
      default: [],
    },
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
