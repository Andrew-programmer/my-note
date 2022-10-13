const Router = require('express');
const router = new Router();
const controller = require('../controllers/tagController');
const authMiddleware = require('../middleware/authorizationMiddleware');

router.post('/', authMiddleware, controller.addTag)

router.get('/', authMiddleware, controller.getAllTags)

// router.get('/:id', authMiddleware, controller.getTag)

router.delete('/:id', authMiddleware, controller.deleteTag)

router.put('/:id', authMiddleware, controller.updateTag)


module.exports = router;
