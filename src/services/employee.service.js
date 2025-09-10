import * as employeeRepo from "../repositories/employee.repo.js";

export const addEmployee = async ({ tenantId, name, email, phone, salary, roleId }) => {
  return employeeRepo.createEmployee({ tenantId, name, email, phone, salary, roleId });
};

export const getEmployees = async (tenantId) => {
  return employeeRepo.findEmployeesByTenant(tenantId);
};

export const getEmployeeById = async (id) => employeeRepo.findEmployeeById(id);

export const updateEmployee = async (id, data) => employeeRepo.updateEmployee(id, data);

export const deleteEmployee = async (id) => employeeRepo.deleteEmployee(id);
