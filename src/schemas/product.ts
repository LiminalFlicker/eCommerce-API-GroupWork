import { string, z } from 'zod/v4';
import { isValidObjectId, Types } from 'mongoose';

export const productInputSchema = z.strictObject({
  name: z.string({ error: 'Product name must be a string' }).min(1, { message: 'Product name is required' }),
  description: z.string({ error: 'Description must be a string' }).min(1, { message: 'Description is required' }),
  price: z.number({ error: 'Price must be a number' }).min(0),
  categoryId: z
    .string()
    .refine(val => isValidObjectId(val), { error: 'Not a valid ObjectId' })
    .transform(val => new Types.ObjectId(val))
});

export const productSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...productInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number()
});
