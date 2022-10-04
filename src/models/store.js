import mongoose, { Schema, ObjectId } from 'mongoose';

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avt: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    hotline: {
      type: Number,
      required: true,
    },
    open: {
      type: Number,
      required: true,
    },
    close: {
      type: Number,
      required: true,
    },
    visiter: {
      type: Number,
      required: true,
    },
    rateId: {
      type: ObjectId,
      ref: 'StoreRating',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Store', storeSchema);
