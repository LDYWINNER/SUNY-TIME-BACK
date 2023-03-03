import mongoose from "mongoose";

const CourseComment = new mongoose.Schema(
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

const CourseSchema = new mongoose.Schema({
  semester: {
    type: [String],
    required: true,
  },
  classNbr: {
    type: Number,
    required: true,
  },
  subj: {
    type: String,
    required: true,
  },
  crs: {
    type: Number,
    requred: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  sbc: {
    type: String,
    requred: true,
  },
  cmp: {
    type: String,
    requred: true,
  },
  sctn: {
    type: String,
    requred: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  day: {
    type: String,
    enum: ["M", "TU", "W", "TH", "F"],
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
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
    type: [CourseComment],
    required: true,
    default: [],
  },
});

export default mongoose.model("Course", CourseSchema);
