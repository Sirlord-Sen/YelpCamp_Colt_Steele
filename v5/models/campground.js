var mongoose = require("mongoose");
//Creating the schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Creating model
module.exports = mongoose.model("Campground", campgroundSchema);