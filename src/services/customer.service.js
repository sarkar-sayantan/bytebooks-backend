import * as customerRepo from "../repositories/customer.repo.js";

export const addCustomer = async ({ tenantId, name, email, phone }) => {
  return customerRepo.createCustomer({ tenantId, name, email, phone });
};

export const getCustomers = async (tenantId) => {
  return customerRepo.findCustomersByTenant(tenantId);
};

export const getCustomerById = async (id) => customerRepo.findCustomerById(id);

export const updateCustomer = async (id, data) => customerRepo.updateCustomer(id, data);

export const deleteCustomer = async (id) => customerRepo.deleteCustomer(id);
