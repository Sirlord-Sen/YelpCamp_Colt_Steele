//Including Express
var express = require('express');
//Executing express
var app = express();
// Including body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//Setting default engine
app.set('view engine', 'ejs');
// Using the public directory as static 
app.use(express.static('public'));

// Creating Campgrounds array
var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2f79d09244cc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2f79d09244cc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f7d2f79d09244cc_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c73277bd69348cc51_340.jpg"}
]

//Home route
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.post('/campgrounds', function(req, res){
    //Get data from form and push into the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    //Make an object and store in the content
    var newCampground = {name: name, image:image};
    campgrounds.push(newCampground);
    //Redirect to campgrounds page
    res.redirect('/campgrounds');
});

app.listen(3000, function(){
    console.log('This is awesome!!!');
});