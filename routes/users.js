var express = require('express');
var router = express.Router();
var User = require ('../models/users');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{
		'title' : 'Index'
	});
});

router.get('/register', function(req, res, next) {
	res.render('register',{
		'title' : 'Register'
	});
});

router.get('/login', function(req, res, next) {
	res.render('login',{
		'title' : 'Login'
	});
});

router.post('/register',function(req,res,next){
    console.log(req.headers['content-type']);
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;	
	
 // Check for Image field
			/*if (req.files.profileImage){
		console.log('Uploading file...');data
		var profileImageOriginalName = req.files.profileImage.originalname;
		var profileImageName = req.files.profileImage.name;
		var profileImageMime = req.files.profileImage.mimetype;
		var profileImagePath = req.files.profileImage.path;
		var profileImageExt = req.files.profileImage.extension;
		var profileImageSize = req.files.profileImage.size;
	} else {
		//set a default Image
		var profileImageName = 'noimage.png'; //just create a image file with this name and place it in upload folder, so by default it will take that image if no image is uplaoded.
	}*/
	// Form Validation  checkBody(fieldName,erroMmsg).function();
	req.checkBody('name','Name field is empty').notEmpty();
	req.checkBody('email','Email field is Empty').notEmpty();
	req.checkBody('email','Email is invalid').isEmail();
	req.checkBody('username','userName field is Empty').notEmpty();
	req.checkBody('password','password field is Empty').notEmpty();
	req.checkBody('password2','password does not match').equals(req.body.password);
	
	// check for errors
	var errors = req.validationErrors();
	 if (errors){
		 res.render('register',{
			 errors : errors,
			 name : name,
			 email : email,
			 password : password,
			 password2 : password2,
			 username : username
		 });
		}else {
			 var newUser = new User({
				 error : errors,
				 name : name,
				 email : email,
				 password : password,
				 username : username,
				 //profileImage : profileImage
			 });
			 User.createUsers(newUser,function(err, user){
				 if (err) throw err;
				 console.log(user);
			 });
			 
			 // Success Message
			 req.flash('success','you are now registered and may log in');
			 res.location('/');
			 res.redirect('/');
		 }
});

passport.serializeUser(function(user,done){
	done (null,user.id);
});

passport.deserializeUser(function(id,done){
	User.getUserById(id, function(err,user){
		done(err, user);
	});
});

passport.use(new localStrategy(
	function(username,password,done){
		User.getUserByUsername(username , function(err,user){
			if (err) throw err;
			if (!user){
				console.log('Unknown user');
				return done(null, false, {message : 'Unknown User'});
			}
			
			User.comparePassword(password, user.password, function(err,isMatch){
				if (err) throw err;
				if (isMatch) {
					return done(null,user);
				} else {
					console.log('Invalid Password');
					return done (null,false, {message : 'Invalid Password'});
				}
			});		
		});
	}
));

router.post('/login', passport.authenticate('local',{failureRedirect : '/users/login',failureFlash:'Invalid Username or Password'}),function(req,res){
	//control will come under this function only when authentication was successful
	console.log('Authentication successful');
	req.flash('Success','You are logged in');
	res.redirect('/');
});


router.get('/logout',function(req,res){
	req.logout();
	req.flash('success', 'successfull logout');
	res.redirect('/users/login');
});

module.exports = router;























