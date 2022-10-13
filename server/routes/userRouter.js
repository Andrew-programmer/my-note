const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/authorizationMiddleware');



router.get('/me', controller.getInfo)

router.patch('/me', authMiddleware, controller.changePassword)

router.delete('/me', authMiddleware, controller.deleteProfile)

router.put('/me', authMiddleware, controller.changeUserInfo)



module.exports = router;
