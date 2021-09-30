//Including Express, bodyparser and mongoose
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    // Requiring the Campground schema
    Campground  = require('./models/campground');
    seedDb        = require('./seeds');

seedDb();
    
// Connecting mongoose to mongo
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });    
// Parsing the body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Setting default engine
app.set('view engine', 'ejs');
// Using the public directory as static 
app.use(express.static('public'));


// Updating the database using create
// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("You updates Successfully!!!");
//         }
//     });

// Creating Campgrounds array
// var campgrounds = [
//     {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2d79dd9e4ecc_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"},
//     {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2d79dd9e4ecc_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"},
//     {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2d79dd9e4ecc_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c732779d69e44c651_340.jpg"}
    
// ]

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
            res.render('campgrounds', {campgrounds: campgrounds});
        }
    })
});

// NEW - show form to craete new campground
app.get('/campgrounds/new', function(req, res){
    res.render('new');
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
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3300, function(){
    console.log('This is awesome!!!');
});