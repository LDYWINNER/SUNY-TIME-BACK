import mongoose from "mongoose";

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
});

export default mongoose.model("Course", CourseSchema);
