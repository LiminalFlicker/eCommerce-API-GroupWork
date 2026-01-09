import { type RequestHandler, type Response, type Request } from 'express';
import { Product } from '#models';
import type { productInputSchema, productSchema } from '#schemas';
import { z } from 'zod/v4';

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = z.infer<typeof productSchema>;

export async function getProducts(req: Request, res: Response<{}, ProductDTO>) {
  const {
    query: { categoryId }
  } = req;

  const products = categoryId === undefined ? await Product.find() : await Product.find({ categoryId: categoryId });

  res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const product = await Product.create<ProductInputDTO>(req.body);
  res.json(product);
}

export async function getProductById(req: Request<{ id: string }>, res: Response<ProductDTO>) {
  const {
    params: { id }
  } = req;

  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found', { cause: 404 });
  res.json(product);
}

/* Todo: To be implemented */
export async function updateProduct(req: Request, res: Response) {
  const {
    body: { title, content, userId },
    params: { id }
  } = req;
}
/* Todo: To be implemented */
export async function deleteProduct(req: Request, res: Response) {}
