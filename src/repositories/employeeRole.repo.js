import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createEmployeeRole = (data) => {
  return prisma.employeeRole.create({ data });
};

export const findEmployeeRolesByTenant = (tenantId) => {
  return prisma.employeeRole.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' }
  });
};

export const findEmployeeRoleById = (id) => {
  return prisma.employeeRole.findUnique({ 
    where: { id },
    include: {
      employees: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

export const findEmployeeRoleByTenantAndName = (tenantId, name) => {
  return prisma.employeeRole.findUnique({
    where: {
      tenantId_name: {
        tenantId,
        name
      }
    }
  });
};

export const updateEmployeeRole = (id, data) => {
  return prisma.employeeRole.update({ 
    where: { id }, 
    data 
  });
};

export const deleteEmployeeRole = (id) => {
  return prisma.employeeRole.delete({ where: { id } });
};

export const countEmployeesWithRole = (roleId) => {
  return prisma.employee.count({
    where: { roleId }
  });
};
