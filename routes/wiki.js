var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page
var User = models.User



router.get('/', function(req, res, next){
  Page.findAll().then(Allpage=>{
    res.render('index',{pages : Allpage})
  });

})

router.post('/', function(req, res, next){
  User.findOrCreate({
    where: {
      name: req.body.full_name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
      tags : req.body.tags.split(' ');
    });

    return page.save().then(function (page) {
      return page.setAuthor(user); // the set method don't need to define, it
    });

  })
  .then(function (page){
    res.redirect(page.getRoute);
  })
  .catch(next);
  });

router.get('/add', function(req, res, next){
  res.render('addpage')

})

router.get('/:urlTitle',function(req,res,next){
  // let findPage;
  // Page.findAll( {
  //   where:{
  //     urlTitle: req.params.urlTitle
  //   }})
  // .then(foundPage=>{
  //   findPage=foundPage;
  //   console.log(findPage[0].authorId);
  //   return User.findById(findPage[0].authorId);
  // }).then(user=>{
  //   //console.log(user);
  //   res.render('wikipage',{page:findPage[0] , user:user});
  // }).catch(next);
  
  Page.findOne({
    where: {
        urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
})
.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
})
.catch(next);

})





module.exports = router
