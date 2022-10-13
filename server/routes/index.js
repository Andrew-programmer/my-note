const Router = require('express');

const router = new Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const noteRouter = require('./noteRouter');
const listRouter = require('./ListRouter');
const tagRouter = require('./tagsRouter')


router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/notes', noteRouter)
router.use('/lists', listRouter)
router.use('/tags', tagRouter)



module.exports = router;
