import mongoose, { Schema, models, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  otp?: string | null;
  otpExpiresAt?: Date | null;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
  generateAuthToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = function (): string {
  const expiresInSeconds = 3600;
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;

  const token = jwt.sign({ _id: this._id, email: this.email, exp }, process.env.JWT_SECRET!);

  return token;
};

const User = models.User || model<IUser>('User', UserSchema);
export default User;
