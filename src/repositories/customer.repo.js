import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCustomer = (data) => {
  return prisma.customer.create({ data });
};

export const findCustomersByTenant = (tenantId) => {
  return prisma.customer.findMany({
    where: { tenantId },
  });
};

export const findCustomerById = (id) => prisma.customer.findUnique({ where: { id } });

export const updateCustomer = (id, data) => prisma.customer.update({ where: { id }, data });

export const deleteCustomer = (id) => prisma.customer.delete({ where: { id } });
