const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const app = express();
const models = require('./models');

var env=nunjucks.configure('views',{noCache : true});
app.set('view engine','html');
app.engine('html',nunjucks.render);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    console.log(req.method, res.statusCode, req.url);
    next();
})
app.use(express.static("public"));
app.use(router);

models.User.sync()
.then( () => models.Page.sync() )
.then( () => app.listen(3000,() => {
    console.log('Server is running on port 3000!!')
}))
.catch( console.error );
