import * as employeeService from "../services/employee.service.js";

export const addEmployee = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const employee = await employeeService.addEmployee({ ...req.body, tenantId });
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const employees = await employeeService.getEmployees(tenantId);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
