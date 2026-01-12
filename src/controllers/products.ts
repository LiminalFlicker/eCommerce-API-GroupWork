import { type RequestHandler, type Response, type Request } from 'express';
import { Product, Category } from '#models';
import type { productInputSchema, productSchema } from '#schemas';
import { z } from 'zod/v4';

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = z.infer<typeof productSchema>;

/**
 * # GET /products?categoryId=
 * # Get all products or get products with specified categoryId send by query
 * @param req
 * @param res
 */
export async function getProducts(req: Request, res: Response<{}, ProductDTO>) {
  const {
    query: { categoryId }
  } = req;

  const products =
    categoryId === undefined
      ? await Product.find().populate('categoryId').lean()
      : await Product.find({ categoryId: categoryId }).populate('categoryId').lean();

  res.json(products);
}

/**
 * # POST /products
 * # Add new product to database
 * @param req
 * @param res
 */
export async function createProduct(req: Request, res: Response) {
  const {
    body: { categoryId }
  } = req;

  const category = await Category.findById(categoryId);
  if (!category) throw new Error('Add product failed: categoryId is not existing', { cause: 406 });

  const product = await Product.create<ProductInputDTO>(req.body);
  res.json(product);
}

/**
 * # GET /products/:id
 * # Get product by Id (ObjectId)
 * @param req
 * @param res
 */
export async function getProductById(req: Request<{ id: string }>, res: Response<ProductDTO>) {
  const {
    params: { id }
  } = req;

  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found', { cause: 404 });
  res.json(product);
}

/**
 * # PUT /products/:id
 * # Update product
 * @param req
 * @param res
 */
export async function updateProduct(req: Request<{ id: string }, ProductInputDTO>, res: Response<ProductDTO>) {
  const {
    body: { name, description, price, categoryId },
    params: { id }
  } = req;

  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found', { cause: 404 });

  const category = await Category.findById(categoryId);
  if (!category) throw new Error('Add product failed: categoryId is not existing', { cause: 406 });

  product.name = name;
  product.description = description;
  product.price = price;
  product.categoryId = categoryId;

  await product.save();
  const populatedProduct = await product.populate('categoryId');

  res.json(populatedProduct);
}
/**
 * # DELETE /products/:id
 * # Delete product with Object Id
 * @param req
 * @param res
 */
export async function deleteProduct(req: Request, res: Response) {
  const {
    params: { id }
  } = req;

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Product not found', { cause: 404 });
  res.json({ message: 'Product deleted' });
}
