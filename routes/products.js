const express = require('express');
const router = express.Router();

// Import Controller
const productCtrl = require('../controllers/products');
// Import Auth Middleware
const auth = require('../middleware/auth');
// Import Multer for files upload
const multer = require('../middleware/multer-config');

// Middlewares CRUD 

router.post('/', auth, multer, productCtrl.createSauce);

router.put('/:id', auth, multer, productCtrl.modifySauce);

router.delete('/:id', auth, productCtrl.deleteSauce);

router.get('/:id', auth, productCtrl.getOneSauce);

router.get('/', auth, productCtrl.getAllSauces);

router.post('/:id/like', auth, productCtrl.rateSauce);

module.exports = router;