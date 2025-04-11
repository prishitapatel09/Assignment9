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
 *     security:
 *       - bearerAuth: []
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - requirements
 *               - location
 *               - salary
 *               - company
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: string
 *               company:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Full-time, Part-time, Contract, Internship]
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, isAdmin, jobController.createJob);

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
