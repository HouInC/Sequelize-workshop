var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page
var User = models.User

router.get('/', function(req, res, next) {
  User.findAll().then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});


router.get('/:id', function(req, res, next){
  var promise=User.findById(req.params.id);
  var pagePromise = Page.findAll({
  	where : {
  		authorId : req.params.id
  	}
  });

  Promise.all([promise,pagePromise]).then(value=>{
  	var user = value[0];
  	var pages = value[1];
  	res.render('user',{user:user, pages:pages});
  })

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


module.exports = router