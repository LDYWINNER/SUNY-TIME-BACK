import { Schema, model } from "mongoose";
import { isStringLiteral } from "typescript";

const CourseSchema = new Schema({
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
    type: [
      {
        any: String,
      },
    ],
    required: true,
  },
  startTime: {
    type: [
      {
        any: String,
      },
    ],
    required: true,
  },
  endTime: {
    type: [
      {
        any: String,
      },
    ],
    required: true,
  },
  room: {
    type: [
      {
        any: String,
      },
    ],
    required: true,
  },
  instructor: {
    type: [
      {
        any: String,
      },
    ],
    required: true,
  },
  likes: {
    type: [String],
    required: true,
    default: [],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "CourseReview",
    },
  ],
});

export default model("Course", CourseSchema);
