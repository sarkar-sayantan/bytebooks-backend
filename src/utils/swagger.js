import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ByteBooks API",
    version: "1.0.0",
    description: "API documentation for ByteBooks backend service",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Bill: {
        type: "object",
        properties: {
          id: { type: "string" },
          tenantId: { type: "string" },
          number: { type: "string" },
          customerId: { type: "string", nullable: true },
          date: { type: "string", format: "date-time" },
          dueDate: { type: "string", format: "date-time", nullable: true },
          total: { type: "string" },
          status: { type: "string", enum: ["DRAFT", "ISSUED", "PAID", "CANCELLED"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      BillItem: {
        type: "object",
        properties: {
          id: { type: "string" },
          billId: { type: "string" },
          categoryId: { type: "string" },
          description: { type: "string", nullable: true },
          amount: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          name: { type: "string", nullable: true },
          image: { type: "string", nullable: true },
          tenantId: { type: "string", nullable: true },
          role: { type: "string", enum: ["ADMIN", "EMPLOYEE", "OWNER"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);


