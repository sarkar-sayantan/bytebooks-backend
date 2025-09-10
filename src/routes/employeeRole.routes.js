import express from "express";
import * as employeeRoleController from "../controllers/employeeRole.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeRole:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the employee role
 *         tenantId:
 *           type: string
 *           format: uuid
 *           description: ID of the tenant this role belongs to
 *         name:
 *           type: string
 *           description: Name of the role
 *         description:
 *           type: string
 *           description: Optional description of the role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of permission strings
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         employeeCount:
 *           type: number
 *           description: Number of employees assigned to this role (only included when requested)
 */

/**
 * @swagger
 * /employee-roles:
 *   post:
 *     summary: Create a new employee role
 *     tags: [Employee Roles]
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tenant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *               description:
 *                 type: string
 *                 description: Optional description of the role
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of permission strings
 *     responses:
 *       201:
 *         description: Employee role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeRole'
 *       400:
 *         description: Bad request - missing required fields or duplicate role name
 *       500:
 *         description: Internal server error
 */
router.post("/", employeeRoleController.addEmployeeRole);

/**
 * @swagger
 * /employee-roles:
 *   get:
 *     summary: Get all employee roles for a tenant
 *     tags: [Employee Roles]
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tenant ID
 *       - in: query
 *         name: includeEmployeeCount
 *         schema:
 *           type: boolean
 *         description: Include employee count for each role
 *     responses:
 *       200:
 *         description: List of employee roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeRole'
 *       400:
 *         description: Bad request - missing tenant ID
 *       500:
 *         description: Internal server error
 */
router.get("/", employeeRoleController.getEmployeeRoles);

/**
 * @swagger
 * /employee-roles/{id}:
 *   get:
 *     summary: Get employee role by ID
 *     tags: [Employee Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee role ID
 *     responses:
 *       200:
 *         description: Employee role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeRole'
 *       404:
 *         description: Employee role not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", employeeRoleController.getEmployeeRoleById);

/**
 * @swagger
 * /employee-roles/{id}:
 *   put:
 *     summary: Update employee role
 *     tags: [Employee Roles]
 *     parameters:
 *       - in: header
 *         name: X-Tenant-Id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tenant ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *               description:
 *                 type: string
 *                 description: Optional description of the role
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of permission strings
 *     responses:
 *       200:
 *         description: Employee role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeRole'
 *       400:
 *         description: Bad request - missing required fields or duplicate role name
 *       404:
 *         description: Employee role not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", employeeRoleController.updateEmployeeRole);

/**
 * @swagger
 * /employee-roles/{id}:
 *   delete:
 *     summary: Delete employee role
 *     tags: [Employee Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee role ID
 *     responses:
 *       204:
 *         description: Employee role deleted successfully
 *       400:
 *         description: Bad request - role is assigned to employees
 *       404:
 *         description: Employee role not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", employeeRoleController.deleteEmployeeRole);

export default router;
