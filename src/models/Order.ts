import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default model('Order', orderSchema);
