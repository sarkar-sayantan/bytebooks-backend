import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: "Uniface",
    },
  });

  // Income categories
  await prisma.category.createMany({
    data: [
      { name: "Hair Treatment", type: "INCOME", tenantId: tenant.id },
      { name: "Facial Treatment", type: "INCOME", tenantId: tenant.id },
      { name: "Others", type: "INCOME", tenantId: tenant.id },
    ],
  });

  // Expense categories
  await prisma.category.createMany({
    data: [
      { name: "Products", type: "EXPENSE", tenantId: tenant.id },
      { name: "Water Bill", type: "EXPENSE", tenantId: tenant.id },
      { name: "Electricity Bill", type: "EXPENSE", tenantId: tenant.id },
      { name: "Salary", type: "EXPENSE", tenantId: tenant.id },
      { name: "Marketing", type: "EXPENSE", tenantId: tenant.id }
    ],
  });

  console.log("Seed data created ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
