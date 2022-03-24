const express = require('express');
const router = express.Router();

// Import Controller
const productCtrl = require('../controllers/products');

// Middlewares CRUD 

router.post('/', productCtrl.createSauce);

router.put('/:id', productCtrl.modifySauce);

router.delete('/:id', productCtrl.deleteSauce);

router.get('/:id', productCtrl.getOneSauce);

router.get('/', productCtrl.getAllSauces);

module.exports = router;