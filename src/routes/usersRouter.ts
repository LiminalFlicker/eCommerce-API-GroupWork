// GET    /users
// POST   /users
// GET    /users/:id
// PUT    /users/:id
// DELETE /users/:id

import { Router } from 'express';
import { getUserById, getUsers, createUser, updateUser, deleteUser } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { userInputSchema } from '#schemas';

const usersRouter = Router();
usersRouter.get('/', getUsers);
usersRouter.post('/', validateBodyZod(userInputSchema), createUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', validateBodyZod(userInputSchema), updateUser);
usersRouter.delete('/:id', deleteUser);
export default usersRouter;
