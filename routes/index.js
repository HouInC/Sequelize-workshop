var express = require('express')
var router = express.Router()
var wikiRouter = require('./wiki.js')
var userRouter = require('./user.js')
module.exports = router

router.use('/wiki', wikiRouter)

