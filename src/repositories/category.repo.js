import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = (data) => {
  return prisma.category.create({ data });
};

export const findCategoriesByTenantAndType = (tenantId, type) =>
  prisma.category.findMany({
    where: { 
      tenantId, 
      type: type?.toUpperCase() // Convert to uppercase for Prisma enum
    },
    orderBy: { name: "asc" },
  });

export const findCategoriesByTenant = (tenantId) =>
  prisma.category.findMany({
    where: { tenantId },
    orderBy: { name: "asc" },
  });

export const findCategoryById = (id) =>
  prisma.category.findUnique({ where: { id } });

export const updateCategory = (id, data) => 
  prisma.category.update({ where: { id }, data });

export const deleteCategory = (id) => 
  prisma.category.delete({ where: { id } });


