import { Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser {
  username: string;
  email: string;
  school: string;
  major: string;
  courseReviewNum: number;
  adminAccount: boolean;
}

export interface IUserMethods {
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
  school: {
    type: String,
    required: [true, "Please provide your school info"],
  },
  major: {
    type: String,
    required: [true, "Please provide your major"],
  },
  courseReviewNum: {
    type: Number,
    required: true,
  },
  adminAccount: {
    type: Boolean,
  },
});

UserSchema.methods.createJWT = function () {
  if (this.adminAccount) {
    jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string);
  }
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default model<IUser, UserModel>("User", UserSchema);
