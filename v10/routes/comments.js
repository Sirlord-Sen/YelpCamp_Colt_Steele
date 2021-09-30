var express     = require('express'),
    // mergeParams is used to merge all the params 
    router      = express.Router({mergeParams: true});

var Campground  = require('../models/campground'),
    Comment     = require('../models/comment');
    middleware  = require('../middleware');

// Comments new    
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// Edit Route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else{
            res.render('comment/edit', {campground_id: req.params.id, comment: foundComment }); 
        }
    });
});

// Update Route
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// Destroy Route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
    // res.send('THIS IS THE DESTROY COMMENT ROUTE')
})


module.exports = router;