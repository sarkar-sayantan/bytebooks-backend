
import express from 'express';
import { addBillItem, getBillItems, getBillItemById, updateBillItem, deleteBillItem } from '../controllers/billItem.controller.js';

const router = express.Router();

/**
 * @swagger
 * /bill-items:
 *   post:
 *     summary: Create a new bill item
 *     tags: [BillItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BillItem'
 *     responses:
 *       200:
 *         description: Bill item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillItem'
 */
router.post('/', addBillItem);

/**
 * @swagger
 * /bill-items:
 *   get:
 *     summary: Get all bill items
 *     tags: [BillItem]
 *     responses:
 *       200:
 *         description: List of bill items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BillItem'
 */
router.get('/', getBillItems);

/**
 * @swagger
 * /bill-items/{id}:
 *   get:
 *     summary: Get a bill item by ID
 *     tags: [BillItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillItem'
 *       404:
 *         description: Bill item not found
 */
router.get('/:id', getBillItemById);

/**
 * @swagger
 * /bill-items/{id}:
 *   put:
 *     summary: Update a bill item
 *     tags: [BillItem]
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
 *             $ref: '#/components/schemas/BillItem'
 *     responses:
 *       200:
 *         description: Bill item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillItem'
 */
router.put('/:id', updateBillItem);

/**
 * @swagger
 * /bill-items/{id}:
 *   delete:
 *     summary: Delete a bill item
 *     tags: [BillItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill item deleted
 */
router.delete('/:id', deleteBillItem);

export default router;
