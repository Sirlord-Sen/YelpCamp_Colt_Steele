//Including Express, bodyparser and mongoose
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    // Requiring the Campground schema
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    seedDb        = require('./seeds');

seedDb();
    
// Connecting mongoose to mongo
mongoose.connect("mongodb://localhost/yelp_camp_4", { useNewUrlParser: true, useUnifiedTopology: true });    
// Parsing the body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Setting default engine
app.set('view engine', 'ejs');
// Using the public directory as static 
app.use(express.static('public'));

//Home route
app.get('/', function(req, res){
    res.render('landing');
});

//INDEX - show all campgrounds 
app.get('/campgrounds', function(req, res){
    // Retrieving all the content of the database
    Campground.find({}, function(err, campgrounds){
        if(err){
            // If there is an error, pring the error message
            console.log(err);
        } else{
            //Else, render the campgrounds template and pass the database into the template
            res.render('campground/campgrounds', {campgrounds: campgrounds});
        }
    })
});

// NEW - show form to craete new campground
app.get('/campgrounds/new', function(req, res){
    res.render('campground/new');
});

//CREATE - Add new campgrounf DB
// Since this is a post request still about campgrounds, we can use the same route.
app.post('/campgrounds', function(req, res){
    //Get data from form and push into the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create new data into Campground database and pass in the data from the form
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //Redirect to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// This must be carefully put in this position because if it is not, it will temper with the '/campgrounds/new' route
//SHOW - shows a particular campground in detail
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

// =================
// COMMENTS ROUTES
// =================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log('Error with new comments route');
        } else{
            res.render('comment/new', {campground: foundCampground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res){
    // Find campground
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect('/campgrounds');
            console.log(err);
        } else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // Connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(3300, function(){
    console.log('This is awesome!!!');
});