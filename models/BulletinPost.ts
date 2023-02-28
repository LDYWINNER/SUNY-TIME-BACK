import mongoose from "mongoose";

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
    board: {
      type: String,
      default: "free",
      required: [true, "Please select a board"],
    },
    stars: {
      type: Number,
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

export default mongoose.model("BulletinPost", BulletinPostSchema);
