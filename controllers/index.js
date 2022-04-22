const router = require('express').Router()

const homepageroute = require('./homepage-route')
const apiroutes= require('./api/')
const dashboard= require('./dashboard')


router.use('/',homepageroute)
router.use('/api',apiroutes)
router.use('/dashboard', dashboard)

 module.exports = router