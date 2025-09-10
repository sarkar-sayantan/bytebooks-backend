import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTenant = (data) => prisma.tenant.create({ data });

export const findTenants = () =>
  prisma.tenant.findMany({
    include: { categories: true },
  });

export const findTenantById = (id) =>
  prisma.tenant.findUnique({
    where: { id },
    include: { categories: true, employeeRoles: true },
  });

export const updateTenant = (id, data) => prisma.tenant.update({ where: { id }, data });

export const deleteTenant = (id) => prisma.tenant.delete({ where: { id } });


