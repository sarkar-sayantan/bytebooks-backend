import * as entryService from "../services/entry.service.js";

export const addEntry = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const entry = await entryService.addEntry({ ...req.body, tenantId });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

export const getEntries = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    const { type } = req.query;
    const entries = await entryService.getEntries(tenantId, type);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const getEntryById = async (req, res, next) => {
  try {
    const entry = await entryService.getEntryById(req.params.id);
    if (!entry) return res.status(404).json({ error: "Entry not found" });
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

export const updateEntry = async (req, res, next) => {
  try {
    const entry = await entryService.updateEntry(req.params.id, req.body);
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

export const deleteEntry = async (req, res, next) => {
  try {
    await entryService.deleteEntry(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getEntryStats = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    if (!tenantId) return res.status(400).json({ error: "X-Tenant-Id header is required" });
    const data = await entryService.getDashboardStats(tenantId);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const getEntryChart = async (req, res, next) => {
  try {
    const tenantId = req.header("x-tenant-id");
    if (!tenantId) return res.status(400).json({ error: "X-Tenant-Id header is required" });
    const { year } = req.query;
    const data = await entryService.getChartData(tenantId, year);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
