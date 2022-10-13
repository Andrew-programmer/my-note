const Router = require('express');
const router = new Router();
const controller = require('../controllers/noteController');
const authMiddleware = require('../middleware/authorizationMiddleware');

router.post('/', authMiddleware, controller.addNote)

router.get('/', authMiddleware, controller.getAllNotes)

router.put('/:id', authMiddleware, controller.updateNote)

router.get('/:id', authMiddleware, controller.getNote)

router.delete('/:id', authMiddleware, controller.deleteNote)


module.exports = router;
