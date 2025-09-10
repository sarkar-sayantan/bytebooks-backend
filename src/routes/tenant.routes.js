import express from "express";
import { createTenant, listTenants, getTenant, updateTenant, deleteTenant } from "../controllers/tenant.controller.js";

const router = express.Router();



/**
 * @openapi
 * /tenants:
 *   get:
 *     summary: List all tenants
 *     tags:
 *       - Tenants
 *     responses:
 *       200:
 *         description: List of tenants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         tenantId:
 *                           type: string
 *                         name:
 *                           type: string
 *                         type:
 *                           type: string
 *                           enum: [INCOME, EXPENSE]
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *             example:
 *               - id: "t-001"
 *                 name: "Acme Corp"
 *                 createdAt: "2024-09-01T10:00:00.000Z"
 *                 updatedAt: "2024-09-01T10:00:00.000Z"
 *                 categories:
 *                   - id: "cat-001"
 *                     tenantId: "t-001"
 *                     name: "Sales"
 *                     type: INCOME
 *                     createdAt: "2024-09-01T10:00:00.000Z"
 *                     updatedAt: "2024-09-01T10:00:00.000Z"
 *                   - id: "cat-002"
 *                     tenantId: "t-001"
 *                     name: "Office"
 *                     type: EXPENSE
 *                     createdAt: "2024-09-01T10:00:00.000Z"
 *                     updatedAt: "2024-09-01T10:00:00.000Z"
 *               - id: "t-002"
 *                 name: "Beta LLC"
 *                 createdAt: "2024-09-02T10:00:00.000Z"
 *                 updatedAt: "2024-09-02T10:00:00.000Z"
 *                 categories: []
 */
router.get("/", listTenants);

/**
 * @openapi
 * /tenants:
 *   post:
 *     summary: Create a tenant
 *     tags:
 *       - Tenants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *           example:
 *             name: "Acme Corp"
 *     responses:
 *       201:
 *         description: Tenant created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "t-001"
 *               name: "Acme Corp"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T10:00:00.000Z"
 */
router.post("/", createTenant);

/**
 * @openapi
 * /tenants/{id}:
 *   get:
 *     summary: Get tenant by id
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tenant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       tenantId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [INCOME, EXPENSE]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *             example:
 *               id: "t-001"
 *               name: "Acme Corp"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T10:00:00.000Z"
 *               categories:
 *                 - id: "cat-001"
 *                   tenantId: "t-001"
 *                   name: "Sales"
 *                   type: INCOME
 *                   createdAt: "2024-09-01T10:00:00.000Z"
 *                   updatedAt: "2024-09-01T10:00:00.000Z"
 *       404:
 *         description: Tenant not found
 */
router.get("/:id", getTenant);

/**
 * @openapi
 * /tenants/{id}:
 *   put:
 *     summary: Update a tenant
 *     tags:
 *       - Tenants
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
 *           example:
 *             name: "Acme Corporation"
 *     responses:
 *       200:
 *         description: Updated tenant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "t-001"
 *               name: "Acme Corporation"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T11:00:00.000Z"
 */
router.put("/:id", updateTenant);

/**
 * @openapi
 * /tenants/{id}:
 *   delete:
 *     summary: Delete a tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete("/:id", deleteTenant);

export default router;


