import express from "express";
import { addCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

/**
 * @openapi
 * /customers:
 *   post:
 *     summary: Add a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 description: Optional
 *               phone:
 *                 type: string
 *                 description: Optional
 *             required:
 *               - name
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Invalid input
 */

router.post("/", addCustomer);
/**
 * @openapi
 * /customers:
 *   get:
 *     summary: Get customers for a tenant
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", getCustomers);

/**
 * @openapi
 * /customers/detail/{id}:
 *   get:
 *     summary: Get customer by id
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 tenantId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   nullable: true
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: "c1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               name: "John Doe"
 *               email: "john@example.com"
 *               phone: "+1-555-1112222"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T10:00:00.000Z"
 *       404:
 *         description: Customer not found
 */
router.get("/detail/:id", getCustomerById);

/**
 * @openapi
 * /customers/detail/{id}:
 *   put:
 *     summary: Update a customer
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *           example:
 *             name: "Jane Doe"
 *             email: "jane@example.com"
 *             phone: "+1-555-3334444"
 *     responses:
 *       200:
 *         description: Updated customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "c1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               name: "Jane Doe"
 *               email: "jane@example.com"
 *               phone: "+1-555-3334444"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T11:00:00.000Z"
 */
router.put("/detail/:id", updateCustomer);

/**
 * @openapi
 * /customers/detail/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete("/detail/:id", deleteCustomer);

export default router;
