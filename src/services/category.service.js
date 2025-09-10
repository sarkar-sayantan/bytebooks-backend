import * as categoryRepo from "../repositories/category.repo.js";

export const addCategory = async ({ tenantId, name, type }) => {
  // Validate required fields
  if (!tenantId) throw new Error("Tenant ID is required");
  if (!name) throw new Error("Category name is required");
  if (!type) throw new Error("Category type is required");
  
  // Convert type to uppercase for Prisma enum
  const normalizedType = type.toUpperCase();
  
  // Validate type is valid enum value
  if (!['INCOME', 'EXPENSE'].includes(normalizedType)) {
    throw new Error("Type must be either INCOME or EXPENSE");
  }
  
  // Business logic placeholder: validate, check for duplicates, etc.
  return categoryRepo.createCategory({ 
    tenantId, 
    name: name.trim(), 
    type: normalizedType 
  });
};

export const getCategories = async (tenantId, type) => {
  if (type) {
    return categoryRepo.findCategoriesByTenantAndType(tenantId, type);
  }
  return categoryRepo.findCategoriesByTenant(tenantId);
};

export const getCategoryById = async (id) => categoryRepo.findCategoryById(id);

export const updateCategory = async (id, data) => {
  // Validate type if provided
  if (data.type) {
    const normalizedType = data.type.toUpperCase();
    if (!['INCOME', 'EXPENSE'].includes(normalizedType)) {
      throw new Error("Type must be either INCOME or EXPENSE");
    }
    data.type = normalizedType;
  }
  
  // Trim name if provided
  if (data.name) {
    data.name = data.name.trim();
  }
  
  return categoryRepo.updateCategory(id, data);
};

export const deleteCategory = async (id) => categoryRepo.deleteCategory(id);


