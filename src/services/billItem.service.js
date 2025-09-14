import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addBillItem = async (data) => {
  return prisma.billItem.create({ data });
};

export const getBillItems = async () => {
  return prisma.billItem.findMany();
};

export const getBillItemById = async (id) => {
  return prisma.billItem.findUnique({ where: { id } });
};

export const updateBillItem = async (id, data) => {
  return prisma.billItem.update({ where: { id }, data });
};

export const deleteBillItem = async (id) => {
  return prisma.billItem.delete({ where: { id } });
};
