import { Router } from 'express';
import { getCategoryById, getCategories, createCategory, updateCategory, deleteCategory } from '#controllers';
import { validateBodyZod, validateParamsZod } from '#middlewares';
import { categoryInputSchema, categoryParamsSchema, categoryUpdateBodySchema } from '#schemas';

const categoryRouter = Router();
categoryRouter.get('/', getCategories);
categoryRouter.post('/', validateBodyZod(categoryInputSchema), createCategory);
categoryRouter.get('/:id', validateParamsZod(categoryParamsSchema), getCategoryById);
categoryRouter.put(
  '/:id',
  validateParamsZod(categoryParamsSchema),
  validateBodyZod(categoryUpdateBodySchema),
  updateCategory
);
categoryRouter.delete('/:id', validateParamsZod(categoryParamsSchema), deleteCategory);

export default categoryRouter;
