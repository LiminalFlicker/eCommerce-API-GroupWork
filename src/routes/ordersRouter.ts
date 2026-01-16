import { Router } from 'express';
import { createOrder, getOrders, getOrderById, deleteOrder } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { createOrderSchema, orderParamsSchema } from '#schemas';

const ordersRouter = Router();

ordersRouter.get('/', getOrders);

ordersRouter.post('/', validateBodyZod(createOrderSchema), createOrder);

ordersRouter.get('/:id', validateBodyZod(orderParamsSchema), getOrderById);

ordersRouter.delete('/:id', validateBodyZod(orderParamsSchema), deleteOrder);

export default ordersRouter;
