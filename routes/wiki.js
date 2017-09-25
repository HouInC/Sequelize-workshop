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
  const title = req.body.title;
  const name = req.body.full_name
  const email = req.body.email
  const content = req.body.content
  const status = req.body.status
  let id;
  User.findOrCreate({where:{
    name :name,
    email:email
  }}).then(array=>{
    var page=Page.build({
      authorid : array.id,
      title: title,
      content: content
    })
    return page;
  }).then(page=>{
    console.log(page);
    return page.save()
  }).then(savedPage=>{
    res.redirect(savedPage.getRoute);
   }).catch(next);
})

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
