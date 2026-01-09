import { z } from 'zod/v4';
import { Types } from 'mongoose';

export const userInputSchema = z.strictObject({
  firstName: z.string({ error: 'first Name must be a String' }).min(2, { message: 'need more than 2 charcters' }),
  lastName: z.string({ error: 'Last Name must be a String' }).min(2, { message: 'need more than 2 charcters' }),
  email: z.email({ message: 'email must be valid' }),
  password: z.string().min(8, { message: '8 charcters need' })
});

export const userSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...userInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number()
});
