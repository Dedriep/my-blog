const router = require('express').Router()

const homepageroute = require('./homepage-route')

router.use('/',homepageroute)


 module.exports = router