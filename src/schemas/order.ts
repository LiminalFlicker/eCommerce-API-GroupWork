import { z } from 'zod';

export const orderProductSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive()
});

export const createOrderSchema = z.object({
  userId: z.string(),
  products: z.array(orderProductSchema).min(1)
});

export const orderParamsSchema = z.object({
  id: z.string()
});
