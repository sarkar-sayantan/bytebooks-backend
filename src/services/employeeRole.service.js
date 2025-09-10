import * as employeeRoleRepo from "../repositories/employeeRole.repo.js";

export const addEmployeeRole = async ({ tenantId, name, description, permissions }) => {
  // Check if role name already exists for this tenant
  const existingRole = await employeeRoleRepo.findEmployeeRoleByTenantAndName(tenantId, name);
  if (existingRole) {
    throw new Error(`Role with name "${name}" already exists for this tenant`);
  }

  return employeeRoleRepo.createEmployeeRole({ 
    tenantId, 
    name, 
    description, 
    permissions: permissions || [] 
  });
};

export const getEmployeeRoles = async (tenantId) => {
  return employeeRoleRepo.findEmployeeRolesByTenant(tenantId);
};

export const getEmployeeRoleById = async (id) => {
  return employeeRoleRepo.findEmployeeRoleById(id);
};

export const updateEmployeeRole = async (id, data) => {
  const { name, tenantId } = data;
  
  // If updating name, check for duplicates
  if (name) {
    const existingRole = await employeeRoleRepo.findEmployeeRoleByTenantAndName(tenantId, name);
    if (existingRole && existingRole.id !== id) {
      throw new Error(`Role with name "${name}" already exists for this tenant`);
    }
  }

  return employeeRoleRepo.updateEmployeeRole(id, data);
};

export const deleteEmployeeRole = async (id) => {
  // Check if any employees are using this role
  const employeeCount = await employeeRoleRepo.countEmployeesWithRole(id);
  if (employeeCount > 0) {
    throw new Error(`Cannot delete role. ${employeeCount} employee(s) are currently assigned to this role.`);
  }

  return employeeRoleRepo.deleteEmployeeRole(id);
};

export const getEmployeeRolesWithEmployeeCount = async (tenantId) => {
  const roles = await employeeRoleRepo.findEmployeeRolesByTenant(tenantId);
  
  // Get employee count for each role
  const rolesWithCount = await Promise.all(
    roles.map(async (role) => {
      const employeeCount = await employeeRoleRepo.countEmployeesWithRole(role.id);
      return {
        ...role,
        employeeCount
      };
    })
  );

  return rolesWithCount;
};
