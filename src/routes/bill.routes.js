
import express from 'express';
import { addBill, getBills, getBillById, updateBill, deleteBill } from '../controllers/bill.controller.js';

const router = express.Router();

/**
 * @swagger
 * /bills:
 *   post:
 *     summary: Create a new bill
 *     tags: [Bill]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       200:
 *         description: Bill created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 */
router.post('/', addBill);

/**
 * @swagger
 * /bills:
 *   get:
 *     summary: Get all bills
 *     tags: [Bill]
 *     responses:
 *       200:
 *         description: List of bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 */
router.get('/', getBills);

/**
 * @swagger
 * /bills/{id}:
 *   get:
 *     summary: Get a bill by ID
 *     tags: [Bill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 */
router.get('/:id', getBillById);

/**
 * @swagger
 * /bills/{id}:
 *   put:
 *     summary: Update a bill
 *     tags: [Bill]
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
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       200:
 *         description: Bill updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 */
router.put('/:id', updateBill);

/**
 * @swagger
 * /bills/{id}:
 *   delete:
 *     summary: Delete a bill
 *     tags: [Bill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill deleted
 */
router.delete('/:id', deleteBill);

export default router;
