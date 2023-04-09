import { Schema, model } from "mongoose";
import { isStringLiteral } from "typescript";

const CourseSchema = new Schema({
  classNbr: {
    type: String,
    required: true,
  },
  subj: {
    type: String,
    required: true,
  },
  crs: {
    type: String,
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
    type: String,
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
  instructor_names: {
    type: String,
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
