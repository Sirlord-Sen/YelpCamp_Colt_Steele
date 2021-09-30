var express     = require('express'),
    router      = express.Router();

var Campground  = require('../models/campground');
    middleware  = require('../middleware/index');

    
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
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campground/new');
});

//CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    var name    = req.body.name,
        price   = req.body.price,
        image   = req.body.image,
        author  = {
            id: req.user._id,
            username: req.user.username
        },
        desc    = req.body.description;
    
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
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

// EDIT ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campground/edit', {campground: foundCampground});
    })   
});



// UPDATE ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log('Error with updating campground');
            res.redirect('/campgrounds');
        } else{
            res.redirect('/campgrounds/' + updatedCampground._id);
        }
    });
});

// DESTROY CAMPGROUND
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds/' + req.params.id)
        } else{
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;