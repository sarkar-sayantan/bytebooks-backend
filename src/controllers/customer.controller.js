import * as customerService from "../services/customer.service.js";

export const addCustomer = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const customer = await customerService.addCustomer({ ...req.body, tenantId });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const customers = await customerService.getCustomers(tenantId);
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
