var express     = require('express'),
    // mergeParams is used to merge all the params 
    router      = express.Router({mergeParams: true});

var Campground  = require('../models/campground'),
    Comment     = require('../models/comment');

// Comments new    
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log('Error with new comments route');
        } else{
            res.render('comment/new', {campground: foundCampground});
        }
    });
});

//Comments create
router.post('/', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect('/campgrounds');
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // Add username and Id comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// Create an isLoggedIn middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;