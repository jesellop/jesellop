const express = require('express');
const multer = require('multer');
const router = express.Router();
const usersController = require('../controllers/users.controller');
//const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({ dest: './public/uploads/' });

router.get('/list', usersController.list);
router.get('/list-sold', usersController.listSold);

router.get('/messages', usersController.messages);
router.get('/:id/messages', usersController.createMessages);
router.post('/:itemId', usersController.send);
router.get('/:itemId/messages_with/:other_id', usersController.chat);
router.get('/messages-with', usersController.messagesWith);

router.get('/:id/profile', usersController.profiles);
router.post('/:id/profile', upload.single('image'), usersController.editProfile);


router.post('/:id/itemMsgs', usersController.itemMsgs);

router.post('/:id/favourite', usersController.favourite)
router.get('/favourite', usersController.listFavourite)
router.post('/:id/deleteFav', usersController.deleteFav);


module.exports = router;
