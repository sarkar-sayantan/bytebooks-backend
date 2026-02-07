/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gstNumber]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Employee" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tenant" ADD COLUMN     "address" TEXT,
ADD COLUMN     "businessEmail" TEXT,
ADD COLUMN     "businessPhone" TEXT,
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "registrationNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "public"."Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_gstNumber_key" ON "public"."Tenant"("gstNumber");
