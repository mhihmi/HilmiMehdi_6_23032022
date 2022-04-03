const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const pswCtrl = require('../middleware/password');
const emailCtrl = require('../middleware/email');

// Front send infos => routes POST
router.post('/signup', emailCtrl, pswCtrl, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;