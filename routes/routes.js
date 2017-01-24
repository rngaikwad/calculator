
exports.loginHandler = function(req, res){

	/*if(req.query.username =="username" && req.query.password =="password")*/
	res.render('login.handlebars', {});
	/*else
		res.write(" Login Failed");*/

}//loginHandler

exports.logoutHandler = function(req, res){
	req.session.destroy();
	res.render('login.handlebars', {LOGGEDIN:false});
}//logoutHandler

exports.profileHandler = function(req, res){
 // user comes to this handler after login, set loggedin variable in session to true.
 req.session.loggedin = true;
 
  var person, mobile_number,address;
  if (req.session.userName){   //session store has userName
   console.log("User Name already in session. It is " + req.session.userName);
   person = req.session.userName;
   req.session.address = "Pune";
   address = req.session.address;
   req.session.mobile = "123654133";
   mobile_number = req.session.mobile;

  }else{ //session store does NOT have userName
   // read username from req.query and keep into the session store
   person = req.query.nm;
   req.session.userName = person;
   console.log("User Name does not exist in session. Hence storing it in session store " + person);
  }

  res.render('profile.handlebars', {name:person,address:address,mobile:mobile_number,
          LOGGEDIN:req.session.loggedin});
 
  
}//profileHandler
exports.landingHandler = function(req, res){
	// user comes to this handler after login, set loggedin variable in session to true.
	req.session.loggedin = true;
	console.log("processing GET request for landing page. Req Param  " + req.query.nm);

	var person;

	
	 if (req.session.userName){   //session store has userName
		console.log("User Name already in session. It is " + req.session.userName);
		person = req.session.userName;
		}


	else{ //session store does NOT have userName
		// read username from req.query and keep into the session store
		person = req.query.nm;
		req.session.userName = person;
		console.log("User Name does not exist in session. Hence storing it in session store " + person);
	}

	res.render('landingpage.handlebars', {welcomeMessage:person, 
										LOGGEDIN:req.session.loggedin});
}//landingHandler

/*exports.cityHandler = function(req, res){*/
	exports.resultHandler = function(req, res){
	var result;
	var math = req.body.math;
	var expression = req.body.expression;
	var expression2 = req.body.expression2;
	if(math == "add")
	result =  (parseInt(expression)+parseInt(expression2)); 
	if(math =="sub")
	result =  (parseInt(expression)-parseInt(expression2)); 
	if(math =="mul")
	result =  (parseInt(expression)*parseInt(expression2)); 
	if(math =="div")
	result =  (parseInt(expression)/parseInt(expression2)); 
	res.render('result.handlebars', {
						aval:expression,
						bval:expression2,
						result:result, 
						welcomeMessage:req.session.userName,
						LOGGEDIN:req.session.loggedin});

}//cityHandler