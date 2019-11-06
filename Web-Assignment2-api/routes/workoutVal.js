const express = require('express');
const router = express.Router();
const workoutController = require('../app/api/controllers/workoutController');

router.post('/', workoutController.create);
router.put('/:Id', workoutController.updateById);
router.get('/:ownerId', workoutController.getByOwnerId);
router.delete('/:Id', workoutController.deleteById);

module.exports = router;