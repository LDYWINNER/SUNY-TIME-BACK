import { Schema, Types, model } from "mongoose";

const CourseReviewSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  semester: {
    type: String,
    required: [true, "Please provide which semester you took this course"],
  },
  homeworkQuantity: {
    type: String,
    enum: ["many", "soso", "few"],
    required: [true, "Please provide homework quantity"],
  },
  teamProjectPresence: {
    type: Boolean,
    required: [true, "Please provide team project presence"],
  },
  difficulty: {
    type: String,
    enum: ["difficult", "soso", "easy"],
  },
  testQuantity: {
    type: Number,
    required: [true, "Please provide test quantity"],
  },
  quizPresence: {
    type: Boolean,
    required: [true, "Please provide quiz presence"],
  },
  overallGrade: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, "Please select overall grade of the course"],
  },
  overallEvaluation: {
    type: String,
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
});

export default model("CourseReview", CourseReviewSchema);
