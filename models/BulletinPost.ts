import mongoose from "mongoose";

const BulletinPostComment = new mongoose.Schema(
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
    dislikes: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const BulletinPostSchema = new mongoose.Schema(
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
    existingBoard: {
      type: String,
      default: "Free",
    },
    newBoard: {
      type: String,
      default: "",
    },
    anonymity: {
      type: Boolean,
      required: true,
      default: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: {
      type: [BulletinPostComment],
      required: true,
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BulletinPost", BulletinPostSchema);
