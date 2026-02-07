import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createEntry = (data) => {
  return prisma.entry.create({ data });
};

export const findEntriesByTenant = (tenantId, type = null) => {
  
  const whereClause = { 
    tenantId : tenantId
  };
  
  if (type) {
    const normalizedType = type.toUpperCase();
    whereClause.type = normalizedType;
  }

  return prisma.entry.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: 'desc' }, // Order by newest first
  });
};

export const findEntryById = (id) =>
  prisma.entry.findUnique({ where: { id }, include: { category: true } });

export const updateEntry = (id, data) => prisma.entry.update({ where: { id }, data });

export const deleteEntry = (id) => prisma.entry.delete({ where: { id } });

// Aggregations and analytics
export const sumAmounts = async ({ tenantId, type = null, dateGte = null, dateLt = null }) => {
  const where = { tenantId };

  if (type) where.type = type;
  if (dateGte) where.date = { ...(where.date || {}), gte: dateGte };
  if (dateLt) where.date = { ...(where.date || {}), lt: dateLt };

  const result = await prisma.entry.aggregate({
    where,
    _sum: { amount: true },
  });

  return result._sum.amount; // Prisma Decimal or null
};

export const findEntriesForYear = ({ tenantId, year }) => {
  const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0));

  return prisma.entry.findMany({
    where: {
      tenantId,
      date: { gte: start, lt: end },
    },
    select: { amount: true, type: true, date: true },
  });
};
