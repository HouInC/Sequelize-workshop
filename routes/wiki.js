var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page
var User = models.User



router.get('/', function(req, res, next){
  Page.findAll().then(Allpage=>{
    res.render('index',{pages : Allpage})
  });


//  res.send('abc');
  //res.redirect('/')

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
  Page.findAll( {
    where:{
      urlTitle: req.params.urlTitle
    }
  }).then(foundPage=>{
    if(foundPage.length){
      console.log(foundPage[0].dataValues);
      res.render('wikipage',{page: foundPage[0].dataValues});
      next();
    }else{
      res.redirect('/');
    }
  }).catch(next);
  //res.json(page);
  // res.send('hit dynamic route at '+req.params.urlTitle);
})





module.exports = router
