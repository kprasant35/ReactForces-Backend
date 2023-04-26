const express = require('express');
const {getReactions, updateReactions} = require('../controllers/reactions');

const router = express.Router();

// READ
router.get('/', getReactions);


// update
router.patch('/', updateReactions);

module.exports = router;