export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addUser = async (data) => {
  return prisma.user.create({ data });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};
