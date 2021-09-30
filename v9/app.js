var express                 = require('express'),
    app                     = express(),
    bodyParser              = require('body-parser'),
    mongoose                = require("mongoose"),
    Campground              = require('./models/campground'),
    Comment                 = require('./models/comment'),
    User                    = require('./models/user'),
    seedDb                  = require('./seeds'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    expressSession          = require('express-session');

// Requring routes    
var commentRoutes   = require('./routes/comments'),
    campgroundRoute = require('./routes/campgrounds'),
    indexRoute      = require('./routes/index');

// seedDb();
mongoose.connect("mongodb://localhost/yelp_camp_9", { useNewUrlParser: true, useUnifiedTopology: true });   

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(expressSession({
    secret: 'soo secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoute);
app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id/comments',commentRoutes);


app.listen(3300, function(){
    console.log('This is awesome!!!');
});