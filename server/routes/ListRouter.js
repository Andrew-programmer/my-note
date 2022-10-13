const Router = require('express');
const router = new Router();
const controller = require('../controllers/listController');
const authMiddleware = require('../middleware/authorizationMiddleware');

router.post('/', authMiddleware, controller.addList)

router.get('/', authMiddleware, controller.getAllLists)

router.put('/:id', authMiddleware, controller.updateList)

router.patch('/:id', authMiddleware, controller.toggleComplete)

router.put('/archive/:id', authMiddleware, controller.toggleArchive)

router.put('/setBody/:id', authMiddleware, controller.setBody)

router.delete('/:id', authMiddleware, controller.deleteList)


module.exports = router;
