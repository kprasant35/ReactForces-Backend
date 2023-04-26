const express = require('express');
const {getUserReaction, updateUserReaction} = require('../controllers/reactions');

const router = express.Router();

// READ
router.get('/', getUserReaction);

// update
router.patch('/', updateUserReaction);

module.exports = router;