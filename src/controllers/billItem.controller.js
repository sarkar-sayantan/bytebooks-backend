
import * as billItemService from "../services/billItem.service.js";

export const addBillItem = async (req, res, next) => {
  try {
    const billItem = await billItemService.addBillItem(req.body);
    res.json(billItem);
  } catch (err) {
    next(err);
  }
};

export const getBillItems = async (req, res, next) => {
  try {
    const billItems = await billItemService.getBillItems();
    res.json(billItems);
  } catch (err) {
    next(err);
  }
};

export const getBillItemById = async (req, res, next) => {
  try {
    const billItem = await billItemService.getBillItemById(req.params.id);
    if (!billItem) return res.status(404).json({ error: "BillItem not found" });
    res.json(billItem);
  } catch (err) {
    next(err);
  }
};

export const updateBillItem = async (req, res, next) => {
  try {
    const billItem = await billItemService.updateBillItem(req.params.id, req.body);
    res.json(billItem);
  } catch (err) {
    next(err);
  }
};

export const deleteBillItem = async (req, res, next) => {
  try {
    const billItem = await billItemService.deleteBillItem(req.params.id);
    res.json(billItem);
  } catch (err) {
    next(err);
  }
};
