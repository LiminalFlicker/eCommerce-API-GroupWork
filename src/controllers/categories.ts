import type { RequestHandler } from 'express';
import { Category } from '#models';
import { categoryInputSchema, categorySchema } from '../schemas/category.ts';
import { z } from 'zod/v4';

// DTOs (Request / Response)
type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryDTO = z.infer<typeof categorySchema>;

// GET /categories
export const getCategories: RequestHandler<{}, CategoryDTO[]> = async (req, res) => {
  const categories = await Category.find().lean();
  res.json(categories);
};

// GET /categories/:id
export const getCategoryById: RequestHandler<{ id: string }, CategoryDTO> = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error('Category not found', { cause: 404 });
  res.json(category);
};

// POST /categories
export const createCategory: RequestHandler<{}, CategoryDTO, CategoryInputDTO> = async (req, res) => {
  const created = await Category.create({ name: req.body.name });
  res.status(201).json(created);
};

// PUT /categories/:id
export const updateCategory: RequestHandler<{ id: string }, CategoryDTO, CategoryInputDTO> = async (req, res) => {
  const {
    body: { name },
    params: { id }
  } = req;

  const updated = await Category.findById(id);
  if (!updated) throw new Error('Category not found', { cause: 404 });

  // Nur updaten wenn name mitgeschickt wurde
  if (name !== undefined) updated.name = name;

  await updated.save();

  // Wenn ihr lean() / toObject() in Responses mögt:
  res.json(updated.toObject());
};

// DELETE /categories/:id
export const deleteCategory: RequestHandler<{ id: string }> = async (req, res) => {
  const {
    params: { id }
  } = req;

  const deleted = await Category.findById(id);
  if (!deleted) throw new Error('Category not found', { cause: 404 });
  await deleted.deleteOne();
  res.status(204).send();
};
