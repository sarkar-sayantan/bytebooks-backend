import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addBill = async (data) => {
  return prisma.bill.create({ data });
};

export const getBills = async (tenantId) => {
  return prisma.bill.findMany({ where: { tenantId } });
};

export const getBillById = async (id) => {
  return prisma.bill.findUnique({ where: { id } });
};

export const updateBill = async (id, data) => {
  return prisma.bill.update({ where: { id }, data });
};

export const deleteBill = async (id) => {
  return prisma.bill.delete({ where: { id } });
};
