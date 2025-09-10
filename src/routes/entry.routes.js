import express from "express";
import { addEntry, getEntries, getEntryById, updateEntry, deleteEntry, getEntryStats, getEntryChart } from "../controllers/entry.controller.js";

const router = express.Router();

/**
 * @openapi
 * /entries:
 *   post:
 *     summary: Add a new entry
 *     tags:
 *       - Entries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *                 description: Case-insensitive (income, INCOME, Income all accepted, stored as uppercase)
 *               categoryId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *                 description: Optional
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Optional
 *             required:
 *               - type
 *               - categoryId
 *               - amount
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Entry created
 *       400:
 *         description: Invalid input
 */

router.post("/", addEntry);
/**
 * @openapi
 * /entries:
 *   get:
 *     summary: Get entries for a tenant
 *     tags:
 *       - Entries
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         description: Filter entries by type (case-insensitive)
 *     responses:
 *       200:
 *         description: List of entries
 */
router.get("/", getEntries);
/**
 * @openapi
 * /entries/detail/{id}:
 *   get:
 *     summary: Get entry by id
 *     tags:
 *       - Entries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 tenantId:
 *                   type: string
 *                 type:
 *                   type: string
 *                   enum: [INCOME, EXPENSE]
 *                 categoryId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [INCOME, EXPENSE]
 *             example:
 *               id: "n1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               type: INCOME
 *               categoryId: "cat-001"
 *               amount: 199.99
 *               description: "Office supplies"
 *               date: "2024-09-01T09:30:00.000Z"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T10:00:00.000Z"
 *               category:
 *                 id: "cat-001"
 *                 name: "Sales"
 *                 type: INCOME
 *       404:
 *         description: Entry not found
 */
router.get("/detail/:id", getEntryById);

/**
 * @openapi
 * /entries/detail/{id}:
 *   put:
 *     summary: Update an entry
 *     tags:
 *       - Entries
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
 *               categoryId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *           example:
 *             categoryId: "cat-002"
 *             amount: 250
 *             description: "Updated description"
 *             date: "2024-09-02T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Updated entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "n1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               categoryId: "cat-002"
 *               amount: 250
 *               description: "Updated description"
 *               date: "2024-09-02T10:00:00.000Z"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-02T10:30:00.000Z"
 */
router.put("/detail/:id", updateEntry);

/**
 * @openapi
 * /entries/detail/{id}:
 *   delete:
 *     summary: Delete an entry
 *     tags:
 *       - Entries
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
router.delete("/detail/:id", deleteEntry);

/**
 * @openapi
 * /entries/stats:
 *   get:
 *     summary: Get dashboard statistics for a tenant
 *     tags:
 *       - Entries
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                     totalExpenses:
 *                       type: number
 *                     netBalance:
 *                       type: number
 *                     monthlyIncome:
 *                       type: number
 *                     monthlyExpenses:
 *                       type: number
 *                     monthlyBalance:
 *                       type: number
 */
router.get("/stats", getEntryStats);

/**
 * @openapi
 * /entries/chart:
 *   get:
 *     summary: Get monthly chart data for a tenant
 *     tags:
 *       - Entries
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: number
 *         description: Year to aggregate (defaults to current year)
 *     responses:
 *       200:
 *         description: Monthly chart data
 */
router.get("/chart", getEntryChart);

export default router;
