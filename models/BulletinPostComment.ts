import { Schema, model, Types } from "mongoose";

const BulletinPostCommentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide text"],
    },
    likes: {
      type: [String],
      required: true,
      default: [],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    bulletin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BulletinPost",
    },
  },
  { timestamps: true }
);

export default model("BulletinPostComment", BulletinPostCommentSchema);
