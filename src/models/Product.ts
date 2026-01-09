import { Schema, model } from 'mongoose';
/**
 * FR013: Product model
 */
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category Id is required']
    }
  },
  {
    timestamps: true
  }
);

export const Product = model('Product', productSchema);
