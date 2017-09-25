var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page
var User = models.User

module.exports = router

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

router.get('/', function(req, res, next){
  console.log('wiki get is up')
  res.redirect('/')

})

router.post('/', function(req, res, next){
  const title = req.body.title;
  const name = req.body.full_name
  const email = req.body.email
  const content = req.body.content
  const status = req.body.status

  var urlTitle = generateUrlTitle(title)
  console.log(urlTitle)


  var page = Page.build({
    title: title,
    content: content,
    urlTitle: urlTitle
  })
   page.save()

  // res.json(req.body)
  res.redirect('/')

})

router.get('/add', function(req, res, next){
  res.render('addpage')

})
