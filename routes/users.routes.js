const express = require('express');
const multer = require('multer');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadCloud = require('../configs/cloudinary.js');


//const upload = multer({ dest: './public/uploads/' });

router.get('/list', usersController.list);
router.get('/list-sold', usersController.listSold);

router.get('/messages', usersController.messages);

router.get('/:id/messages', authMiddleware.isAuthenticated, usersController.createMessages);

router.post('/:itemId', usersController.send);
router.get('/:itemId/messages_withS/:other_id', usersController.chatS);
router.get('/:itemId/messages_withR/:other_id', usersController.chatR);
router.get('/messages-with', usersController.messagesWith);

router.get('/:id/profile', authMiddleware.isAuthenticated, usersController.profiles);
router.post('/:id/profile', authMiddleware.isAuthenticated, uploadCloud.single('image'), usersController.editProfile);

router.post('/:id/itemMsgs', authMiddleware.isAuthenticated, usersController.itemMsgs);

router.post('/:id/favourite', usersController.favourite)
router.get('/favourite', usersController.listFavourite)
router.post('/:id/deleteFav', usersController.deleteFav);


module.exports = router;
