import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { PrismaClient } from "@prisma/client";
import entryRoutes from "./routes/entry.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import employeeRoleRoutes from "./routes/employeeRole.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import billRoutes from "./routes/bill.routes.js";
import billItemRoutes from "./routes/billItem.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/entries", entryRoutes);
app.use("/customers", customerRoutes);
app.use("/employees", employeeRoutes);
app.use("/employee-roles", employeeRoleRoutes);
app.use("/tenants", tenantRoutes);
app.use("/categories", categoryRoutes);
app.use("/bills", billRoutes);
app.use("/billItems", billItemRoutes);
app.use("/users", userRoutes); 

// Health check
app.get("/", (req, res) => {
  res.send("ByteBooks API is running 🚀");
});

// Database health check
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "healthy", database: "connected", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: "unhealthy", database: "disconnected", error: error.message, timestamp: new Date().toISOString() });
  }
});

// Error handler
app.use(errorHandler);

export default app;
