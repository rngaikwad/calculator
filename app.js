var express = require('express');
var handlebars = require('express-handlebars');
var bodyparser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(express.static(__dirname + "/public"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(session({secret: "secret",  resave : true,  saveUninitialized : false}));

var routes = require('./routes/routes.js');

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({}));

app.get('/', routes.loginHandler);
app.get('/logout', routes.logoutHandler);
app.get('/toLanding', routes.landingHandler);
app.post('/toResult', routes.resultHandler);
app.get('/cancel',routes.landingHandler);
app.get('/toProfile', routes.profileHandler);
app.use("*", function(req, res) {
     res.status(404);
     res.render('404.handlebars', {});
});

app.use(function(error, req, res, next) {
     console.log('Error : 500::' + error);
     res.status(500);
     res.render('500.handlebars', {err:error});  // good for knowledge but don't do it
});


var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('HTTP server is listening on port: ' + port);
});