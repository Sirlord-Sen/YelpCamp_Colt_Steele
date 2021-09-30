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
router.get('/new', function(req, res){
    res.render('campground/new');
});

//CREATE
router.post('/', function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
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

module.exports = router;