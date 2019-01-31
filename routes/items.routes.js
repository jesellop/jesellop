const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
//const authMiddleware = require('../middlewares/auth.middleware');


router.get('/', itemsController.list);

router.get('/create', itemsController.create);
router.post('/create', itemsController.doCreate);

// router.get('/items/:id', itemsController.get);
// router.post('/items/:id/delete', itemsController.doDelete);
// router.get('/items/:id/edit', itemsController.edit);
// router.post('/items/:id/edit', itemsController.doEdit);


// router.get('/messges/:to', itemsController.list);
// router.post('/messges/:to', itemsController.doSend);


/*
1 - Login/Registro con FB -> OJO!! mirar tb por el emial/facebookId
2- Controller de items -> crear, listar, borrar
3- Con faker crear muchos usuarios con muchos productos
4- Que algunos de los usuarios generados usen email de fb que conocemos
5- Mensajes controller -> list/send
6- Marcar como vendido

*/


module.exports = router;
