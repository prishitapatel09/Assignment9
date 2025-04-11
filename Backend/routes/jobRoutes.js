// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin'); // Optional: Admin-only access

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - title
 *               - description
 *               - salary
 *             properties:
 *               company:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', jobController.createJob);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all job listings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 */
router.get('/', jobController.getAllJobs);

module.exports = router;
