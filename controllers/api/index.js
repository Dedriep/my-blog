const router = require('express').Router()

const postroute = require('./post-route')
const userroute = require('./user-routes')
const commentRoute = require('./comment-route')


router.use('/posts',postroute)
router.use('/comments', commentRoute)
router.use('/users', userroute)

module.exports = router