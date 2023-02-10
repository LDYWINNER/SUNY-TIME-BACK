import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  passwordRegister: {
    type: String,
    required: [true, "Please provide password"],

    minlength: 8,
  },
  school: {
    type: String,
    required: [true, "Please provide your school info"],
  },
  major: {
    type: String,
    required: [true, "Please provide your major"],
  },
});

export default mongoose.model("User", UserSchema);
