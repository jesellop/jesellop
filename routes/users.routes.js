const express = require('express');
const multer = require('multer');
const router = express.Router();
const usersController = require('../controllers/users.controller');
//const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({ dest: './public/uploads/' });

router.get('/list', usersController.list);
router.get('/list-sold', usersController.listSold);

router.get('/messages', usersController.messages);

router.get('/send-messages', usersController.sendMessages);

router.get('/:id/profile', usersController.profiles);
router.post('/:id/profile', upload.single('image'), usersController.editProfile);

router.post('/:id/favourite', usersController.favourite)
router.get('/favourite', usersController.listFavourite)
router.post('/:id/deleteFav', usersController.deleteFav);

module.exports = router;
