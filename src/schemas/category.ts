import { z } from 'zod/v4';
import { Types } from 'mongoose';

// Body, Params, Query Validations (Bruachen wir Query hier?)

// ObjectId kommt im Request immer als STRING
export const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid id format' });

// POST /categories  (req.body-schema)
export const categoryInputSchema = z.strictObject({
  name: z.string({ error: 'Category name must be a String' }).trim().min(2, { message: 'need more than 2 characters' })
});

export const createCategorySchema = z.strictObject({
  body: categoryInputSchema
});

// PUT /categories/:id (Request-Schema)
export const updateCategorySchema = z.strictObject({
  params: z.object({
    id: objectIdSchema
  }),
  body: z.object({
    name: z.string().trim().min(2).optional()
  })
});

// GET , DELETE /categories/:id (Request-Schema)
export const categoryIdParamSchema = z.strictObject({
  params: z.object({
    id: objectIdSchema
  })
});

// Response Schema for Category
export const categorySchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...categoryInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number()
});
