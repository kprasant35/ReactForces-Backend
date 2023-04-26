const express = require('express');
const {getUserReaction} = require('../controllers/reactions');

const router = express.Router();

// READ
router.get('/', getUserReaction);


module.exports = router;