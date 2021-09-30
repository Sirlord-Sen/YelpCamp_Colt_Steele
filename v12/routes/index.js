var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');    

//root route
router.get('/', function(req, res){
    res.render('landing');
});

// show register route
router.get('/register', function(req, res){
    res.render('register');
});

// create new user
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp, ' + user.username);
            res.redirect('/campgrounds');
        });
    });
});

//show Login route
router.get('/login', function(req, res){
    res.render('login');
});

// Handling Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){

});

// Logout route
router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success', "You have logged out!");
    res.redirect('/campgrounds');
})

module.exports = router;