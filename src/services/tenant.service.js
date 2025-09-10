import * as tenantRepo from "../repositories/tenant.repo.js";

export const addTenant = async ({ name }) => {
  return tenantRepo.createTenant({ name });
};

export const getTenants = async () => tenantRepo.findTenants();

export const getTenantById = async (id) => tenantRepo.findTenantById(id);

export const editTenant = async (id, { name }) => tenantRepo.updateTenant(id, { name });

export const removeTenant = async (id) => tenantRepo.deleteTenant(id);


