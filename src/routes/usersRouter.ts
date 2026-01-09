// GET    /users
// POST   /users
// GET    /users/:id
// PUT    /users/:id
// DELETE /users/:id

import { Router } from 'express';
import { getUserById, getUsers, createUser, updateUser, deleteUser } from '#controllers';

const usersRouter = Router();
usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
export default usersRouter;
