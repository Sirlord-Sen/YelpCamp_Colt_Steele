var express                 = require('express'),
    app                     = express(),
    bodyParser              = require('body-parser'),
    mongoose                = require("mongoose"),
    Campground              = require('./models/campground'),
    Comment                 = require('./models/comment'),
    flash                   = require('connect-flash'),
    User                    = require('./models/user'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    expressSession          = require('express-session'),
    methodOverride          = require('method-override');

// Requring routes    
var commentRoutes   = require('./routes/comments'),
    campgroundRoute = require('./routes/campgrounds'),
    indexRoute      = require('./routes/index');

// Connection to Database
mongoose.connect("mongodb://localhost/yelp_camp_final", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

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

app.use( (req, res, next) => {
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash('error');
    res.locals.success      = req.flash('success');
    next();
});

app.use(indexRoute);
app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id/comments',commentRoutes);

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`You are reading from Port ${port}`) );