import type { RequestHandler } from 'express';
import { User, Product, Order } from '#models';

export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products } = req.body;

  // 1. user exists?
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found', { cause: 404 });
  }

  // 2. calculate total
  let total = 0;

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error('Product not found', { cause: 404 });
    }
    total += product.price * item.quantity;
  }

  // 3. create order
  const order = await Order.create({
    userId,
    products,
    total
  });

  res.status(201).json(order);
};

export const getOrders: RequestHandler = async (_req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const getOrderById: RequestHandler<{ id: string }> = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new Error('Order not found', { cause: 404 });
  }
  res.json(order);
};

export const deleteOrder: RequestHandler<{ id: string }> = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    throw new Error('Order not found', { cause: 404 });
  }
  res.status(204).send();
};
