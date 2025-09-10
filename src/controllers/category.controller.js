import * as categoryService from "../services/category.service.js";

export const addCategory = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const category = await categoryService.addCategory({ ...req.body, tenantId });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const { type } = req.query;
    const categories = await categoryService.getCategories(tenantId, type);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


