const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');
const emailCtrl = require('../middleware/email');

// Front send infos => routes POST
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;