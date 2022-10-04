import mongoose from 'mongoose';
import { createHmac } from 'crypto';

const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 15,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avt: {
      type: String,
    },
    roleId: {
      type: ObjectId,
      ref: 'UserRole',
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate(password) {
    return this.password === this.encryptPassword(password);
  },
  encryptPassword(password) {
    if (!password) return;
    try {
      // eslint-disable-next-line consistent-return
      return createHmac('Sha256', 'abc').update(password).digest('hex');
    } catch (error) {
      console.log(error);
    }
  },
};

userSchema.pre('save', function (next) {
  try {
    this.password = this.encryptPassword(this.password);
    next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model('User', userSchema);
