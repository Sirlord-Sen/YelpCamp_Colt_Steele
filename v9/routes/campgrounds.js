var express     = require('express'),
    router      = express.Router();

var Campground  = require('../models/campground');


//INDEX - show all campgrounds 
router.get('/', function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('campground/campgrounds', {campgrounds: campgrounds});
        }
    })
});

//NEW
router.get('/new', isLoggedIn, function(req, res){
    res.render('campground/new');
});

//CREATE
router.post('/', isLoggedIn, function(req, res){
    var name    = req.body.name,
        image   = req.body.image,
        author  = {
            id: req.user._id,
            username: req.user.username
        },
        desc    = req.body.description;
    
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds');
        }
    });
});

//SHOW
router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campground/show", {campground: foundCampground});
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