const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
//const authMiddleware = require('../middlewares/auth.middleware');

router.get('/list', usersController.list);


module.exports = router;
