var express = require('express')
var router = express.Router()
module.exports = router


router.get('/', function(req, res, next){
  res.send()
})

router.get('/:id', function(req, res, next){
  res.send()
})

router.post('/', function(req, res, next){
  res.redirect('/')
})

router.put('/:id', function(req, res, next){
  res.redirect('/')
})

router.delete('/:id', function(req, res, next){
  res.redirect('/')
})
