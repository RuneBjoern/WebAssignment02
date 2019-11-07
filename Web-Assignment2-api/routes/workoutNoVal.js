const express = require('express');
const router = express.Router();
const workoutController = require('../app/api/controllers/workoutController');

router.get('/', workoutController.getAll);
router.get('/:Id', workoutController.getById);

module.exports = router;