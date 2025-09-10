import express from "express";
import { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Add a new employee
 *     tags:
 *       - Employees
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
 *               salary:
 *                 type: number
 *               roleId:
 *                 type: string
 *                 description: Optional
 *             required:
 *               - name
 *               - salary
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Employee created
 *       400:
 *         description: Invalid input
 */
router.post("/", addEmployee);
/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get employees for a tenant
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/", getEmployees);
/**
 * @openapi
 * /employees/detail/{id}:
 *   get:
 *     summary: Get employee by id
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
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
 *                 salary:
 *                   type: number
 *                 role:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: "e1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               name: "Alice"
 *               email: "alice@example.com"
 *               phone: "+1-555-2223333"
 *               salary: 55000
 *               role: "Manager"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T10:00:00.000Z"
 *       404:
 *         description: Employee not found
 */
router.get("/detail/:id", getEmployeeById);

/**
 * @openapi
 * /employees/detail/{id}:
 *   put:
 *     summary: Update an employee
 *     tags:
 *       - Employees
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
 *               salary:
 *                 type: number
 *               role:
 *                 type: string
 *           example:
 *             name: "Alice B."
 *             email: "alice.b@example.com"
 *             phone: "+1-555-2223333"
 *             salary: 60000
 *             role: "Senior Manager"
 *     responses:
 *       200:
 *         description: Updated employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id: "e1f2a3b4-5678-90ab-cdef-1234567890ab"
 *               tenantId: "t-001"
 *               name: "Alice B."
 *               email: "alice.b@example.com"
 *               phone: "+1-555-2223333"
 *               salary: 60000
 *               role: "Senior Manager"
 *               createdAt: "2024-09-01T10:00:00.000Z"
 *               updatedAt: "2024-09-01T11:00:00.000Z"
 */
router.put("/detail/:id", updateEmployee);

/**
 * @openapi
 * /employees/detail/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags:
 *       - Employees
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
router.delete("/detail/:id", deleteEmployee);

export default router;
