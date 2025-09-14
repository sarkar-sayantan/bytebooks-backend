
import * as billService from "../services/bill.service.js";

export const addBill = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const bill = await billService.addBill({ ...req.body, tenantId });
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

export const getBills = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const bills = await billService.getBills(tenantId);
    res.json(bills);
  } catch (err) {
    next(err);
  }
};

export const getBillById = async (req, res, next) => {
  try {
    const bill = await billService.getBillById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

export const updateBill = async (req, res, next) => {
  try {
    const bill = await billService.updateBill(req.params.id, req.body);
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    const bill = await billService.deleteBill(req.params.id);
    res.json(bill);
  } catch (err) {
    next(err);
  }
};
