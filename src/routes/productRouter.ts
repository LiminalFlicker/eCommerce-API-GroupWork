import { Router, type NextFunction, type Request, type Response } from 'express';
import { getProducts, createProduct, getProductById } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { productInputSchema } from '#schemas';

export const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateBodyZod(productInputSchema), createProduct);
productRouter.get('/:id', getProductById);

export default productRouter;
