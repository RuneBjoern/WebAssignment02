const express = require('express');
const router = express.Router();
const exerciseController = require('../app/api/controllers/exerciseController');

router.get('/:workoutId', exerciseController.getByWorkoutId);
router.get('/:Id', exerciseController.getById);

module.exports = router;