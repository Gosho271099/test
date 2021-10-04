// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/*GET Home Page*/
router.get('/', mainController.index);

/*GET Login Page*/
router.get('/login', mainController.login);

/* Search */
router.get('/search', mainController.search);


// ************ DON'T TOUCH FROM HERE ************
module.exports = router;