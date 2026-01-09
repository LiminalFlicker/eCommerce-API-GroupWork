import { Router, type NextFunction, type Request, type Response } from 'express';
// import { getProducts, createProduct, getProductById } from '#controllers';
// import { authMiddleWare, validateBodyZod, validatePost } from '#middlewares';
// import { productInputSchema } from '#schemas';

export const productRouter = Router();

productRouter.get('/', authMiddleWare, getProducts);
productRouter.post('/', validateBodyZod(productInputSchema), authMiddleWare, createProduct);
productRouter.get('/:id', authMiddleWare, getProductById);
