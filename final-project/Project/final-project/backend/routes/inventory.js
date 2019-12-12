const express = require('express');
const InventoryController = require('../controllers/inventory');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('', checkAuth, InventoryController.createInventory);

module.exports = router;
