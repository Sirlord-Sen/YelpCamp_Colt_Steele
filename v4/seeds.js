var mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comments    = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image:'https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73277fd79045c55c_340.jpg',
        description: 'blah blah blah blah blah blah'
    },
    {
        name: "Desert Mesa",
        image:'https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c73277fd79045c55c_340.jpg',
        description: 'blah blah blah blah blah blah'
    },
    {
        name: "Canyon Floor",
        image:'https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73277fd79045c55c_340.jpg',
        description: 'blah blah blah blah blah blah'
    }
]

function seedEm(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log("Could not remove all campgrounds");
        } else{
            // Create campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log('Could not add new campground');
                    } else{
                        console.log('Added new Campground');
                        // Add new comments
                        Comments.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homey"
                            }, function(err, comment){
                                if(err){
                                    console.log('Could not create new comment');
                                } else{
                                    // push comment into campground
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment inside the campgrounds")
                                }
                            });
                    }
                });
            });
        }
    });
}; 
module.exports = seedEm;