import { Document, model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

/* pre save middleware / hook */
UserSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save data');
  const user = this as Document & TUser;
  // hashing password and prepare data for save
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_saltRounds),
  );
  next();
});

/*  set '' after saving password */
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', UserSchema);
