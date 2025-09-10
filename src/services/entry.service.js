import * as entryRepo from "../repositories/entry.repo.js";

export const addEntry = async ({ tenantId, type, categoryId, amount, description, date }) => {
  // Validate required fields
  if (!tenantId) throw new Error("Tenant ID is required");
  if (!type) throw new Error("Type is required");
  if (!categoryId) throw new Error("Category ID is required");
  if (!amount) throw new Error("Amount is required");
  
  // Convert type to uppercase for Prisma enum
  const normalizedType = type.toUpperCase();
  
  // Validate type is valid enum value
  if (!['INCOME', 'EXPENSE'].includes(normalizedType)) {
    throw new Error("Type must be either INCOME or EXPENSE");
  }
  
  // Business logic placeholder: validate, compute taxes, etc.
  return entryRepo.createEntry({ 
    tenantId, 
    type: normalizedType, 
    categoryId, 
    amount, 
    description, 
    date: date ? new Date(date) : new Date() 
  });
};

export const getEntries = async (tenantId, type = null) => {
  return entryRepo.findEntriesByTenant(tenantId, type);
};

export const getEntryById = async (id) => entryRepo.findEntryById(id);

export const updateEntry = async (id, data) => entryRepo.updateEntry(id, data);

export const deleteEntry = async (id) => entryRepo.deleteEntry(id);

// Dashboard statistics
export const getDashboardStats = async (tenantId) => {
  if (!tenantId) throw new Error("Tenant ID is required");

  // All-time
  const [totalIncomeDec, totalExpensesDec] = await Promise.all([
    entryRepo.sumAmounts({ tenantId, type: 'INCOME' }),
    entryRepo.sumAmounts({ tenantId, type: 'EXPENSE' }),
  ]);

  const totalIncome = Number(totalIncomeDec || 0);
  const totalExpenses = Number(totalExpensesDec || 0);
  const netBalance = totalIncome - totalExpenses;

  // Current month boundaries in UTC
  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
  const startOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0));

  const [monthlyIncomeDec, monthlyExpensesDec] = await Promise.all([
    entryRepo.sumAmounts({ tenantId, type: 'INCOME', dateGte: startOfMonth, dateLt: startOfNextMonth }),
    entryRepo.sumAmounts({ tenantId, type: 'EXPENSE', dateGte: startOfMonth, dateLt: startOfNextMonth }),
  ]);

  const monthlyIncome = Number(monthlyIncomeDec || 0);
  const monthlyExpenses = Number(monthlyExpensesDec || 0);
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    monthlyIncome,
    monthlyExpenses,
    monthlyBalance,
  };
};

// Chart data for 12 months
export const getChartData = async (tenantId, yearOpt) => {
  if (!tenantId) throw new Error("Tenant ID is required");

  const now = new Date();
  const year = yearOpt ? Number(yearOpt) : now.getUTCFullYear();

  const entries = await entryRepo.findEntriesForYear({ tenantId, year });

  // Initialize buckets for 12 months
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const incomeByMonth = Array(12).fill(0);
  const expenseByMonth = Array(12).fill(0);

  for (const e of entries) {
    const d = new Date(e.date);
    const monthIdx = d.getUTCMonth();
    const amount = Number(e.amount);
    if (e.type === 'INCOME') incomeByMonth[monthIdx] += amount;
    else if (e.type === 'EXPENSE') expenseByMonth[monthIdx] += amount;
  }

  return months.map((m, i) => {
    const income = incomeByMonth[i] || 0;
    const expenses = expenseByMonth[i] || 0;
    return {
      month: m,
      income,
      expenses,
      balance: income - expenses,
    };
  });
};
