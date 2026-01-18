import { z } from 'zod/v4';
import { Types } from 'mongoose';

// Body, Params, Query Validations (Bruachen wir Query hier?)

// ObjectId kommt im Request immer als STRING
export const objectIdSchema = z.string().refine(val => Types.ObjectId.isValid(val), { message: 'Invalid id format' });

// für validateParamsZod(req.params)
export const categoryParamsSchema = z.strictObject({
  id: objectIdSchema
});

// POST /categories  (req.body-schema)
export const categoryInputSchema = z.strictObject({
  name: z.string({ error: 'Category name must be a String' }).trim().min(2, { message: 'need more than 2 characters' })
});

export const createCategorySchema = z.strictObject({
  body: categoryInputSchema
});

// PUT Body
export const categoryUpdateBodySchema = z.strictObject({
  name: z.string().trim().min(2).optional()
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

// Response Schema
export const categorySchema = z.strictObject({
  id: z.string(),
  ...categoryInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date()
});
