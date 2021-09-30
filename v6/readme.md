# Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of your routes

# Show Page
* Review the RESTful routes we've seen so far
* Add descriptions to our campground model
* show db.collection.drop()
* Add a show route/template
* findById method

RESTFUL ROUTES

name         url          verb     desc
======================================================================
INDEX       /dogs         GET      Displays a list of all dogs
NEW         /dogs/new     GET      Displays form to make a new dog
CREATE      /dogs         POST     Add new dog to DB
SHOW        /dogs/:id     GET      Shows info about a particular dog

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model!
* Make our errors go away
* Display comments in campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add te new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

===============
   Version 6
===============
# Adding Authentication
* Require passport, passport-local, passport-local-mongoose, and express-session
* Create user model and require both mongoose and passport-local-mongoose.
* userSchema.plugin(passportLocalMongoose);
* Use express-session by passing in an object with the following properties; secret: <Anything string>, resave: 'false', and uninitialize: 'false'.
* Use express to Initialize passport
* Use express to set passport's session
* passport.use(new LocalStrategy(User.authenticate()));
* passport.serializeUser(User.serializeUser());
* passport.deserializeUser(User.deserializeUser());

