import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  username: string;
  email: string;
  passwordRegister: string;
  school: string;
  major: string;
}

interface IUserMethods {
  createJWT(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    select: false,
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

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.passwordRegister = await bcrypt.hash(this.passwordRegister, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(
    candidatePassword,
    this.passwordRegister
  );
  return isMatch;
};

export default model<IUser, UserModel>("User", UserSchema);
