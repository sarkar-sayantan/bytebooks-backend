import * as employeeRoleService from "../services/employeeRole.service.js";

export const addEmployeeRole = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    if (!tenantId) {
      return res.status(400).json({ error: "X-Tenant-Id header is required" });
    }

    const { name, description, permissions } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const employeeRole = await employeeRoleService.addEmployeeRole({ 
      tenantId, 
      name, 
      description, 
      permissions 
    });
    
    res.status(201).json(employeeRole);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeRoles = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    if (!tenantId) {
      return res.status(400).json({ error: "X-Tenant-Id header is required" });
    }

    const includeEmployeeCount = req.query.includeEmployeeCount === 'true';
    
    let employeeRoles;
    if (includeEmployeeCount) {
      employeeRoles = await employeeRoleService.getEmployeeRolesWithEmployeeCount(tenantId);
    } else {
      employeeRoles = await employeeRoleService.getEmployeeRoles(tenantId);
    }
    
    res.json(employeeRoles);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeRoleById = async (req, res, next) => {
  try {
    const employeeRole = await employeeRoleService.getEmployeeRoleById(req.params.id);
    if (!employeeRole) {
      return res.status(404).json({ error: "Employee role not found" });
    }
    res.json(employeeRole);
  } catch (err) {
    next(err);
  }
};

export const updateEmployeeRole = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    if (!tenantId) {
      return res.status(400).json({ error: "X-Tenant-Id header is required" });
    }

    const employeeRole = await employeeRoleService.updateEmployeeRole(req.params.id, {
      ...req.body,
      tenantId
    });
    
    if (!employeeRole) {
      return res.status(404).json({ error: "Employee role not found" });
    }
    
    res.json(employeeRole);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployeeRole = async (req, res, next) => {
  try {
    await employeeRoleService.deleteEmployeeRole(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
