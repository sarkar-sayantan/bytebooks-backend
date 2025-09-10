import * as tenantService from "../services/tenant.service.js";

export const createTenant = async (req, res, next) => {
  try {
    const tenant = await tenantService.addTenant(req.body);
    res.status(201).json(tenant);
  } catch (err) {
    next(err);
  }
};

export const listTenants = async (req, res, next) => {
  try {
    const tenants = await tenantService.getTenants();
    res.json(tenants);
  } catch (err) {
    next(err);
  }
};

export const getTenant = async (req, res, next) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });
    res.json(tenant);
  } catch (err) {
    next(err);
  }
};

export const updateTenant = async (req, res, next) => {
  try {
    const tenant = await tenantService.editTenant(req.params.id, req.body);
    res.json(tenant);
  } catch (err) {
    next(err);
  }
};

export const deleteTenant = async (req, res, next) => {
  try {
    await tenantService.removeTenant(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


