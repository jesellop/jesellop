const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
//const authMiddleware = require('../middlewares/auth.middleware');

router.get('/list', usersController.list);
router.get('/list-sold', usersController.listSold);

router.get('/messages', usersController.messages);

router.get('/send-messages', usersController.sendMessages);

router.get('/profile', usersController.profiles);
//router.post('/:id/doProfile', itemsController.doProfile);

module.exports = router;
