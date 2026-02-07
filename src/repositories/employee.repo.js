import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createEmployee = (data) => {
  return prisma.employee.create({ data });
};

// Get all employees (with role.name)
export const findEmployeesByTenant = async (tenantId) => {
  const employees = await prisma.employee.findMany({
    where: tenantId ? { tenantId } : {},
    include: { role: true }
  });

  return employees.map(emp => ({
    id: emp.id,
    tenantId: emp.tenantId,
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
    salary: emp.salary,
    role: emp.role?.name,  // return role name
    createdAt: emp.createdAt,
    updatedAt: emp.updatedAt
  }));
};

// Get employee by id (with role.name)
export const findEmployeeById = async (id) => {
  const emp = await prisma.employee.findUnique({
    where: { id },
    include: { role: true }
  });

  if (!emp) return null;

  return {
    id: emp.id,
    tenantId: emp.tenantId,
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
    salary: emp.salary,
    role: emp.role?.name,  // return role name
    createdAt: emp.createdAt,
    updatedAt: emp.updatedAt
  };
};

export const findEmployeeByEmail = async (email) => {
  const emp = await prisma.employee.findUnique({
    where: { email } ,
    include: { role: true }
  });

  if (!emp) return null;

  return {
    id: emp.id,
    tenantId: emp.tenantId,
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
    salary: emp.salary,
    role: emp.role?.name,  // return role name
    createdAt: emp.createdAt,
    updatedAt: emp.updatedAt
  };
};


export const updateEmployee = async (id, data) => awaitprisma.employee.update({ where: { id }, data });

export const deleteEmployee = async (id) => await prisma.employee.delete({ where: { id } });
