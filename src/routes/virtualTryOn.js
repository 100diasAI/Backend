const express = require('express');
const { virtualTryOn } = require('../controllers/virtualTryOn.controller');

const router = express.Router();

router.post('/', virtualTryOn);

module.exports = router;