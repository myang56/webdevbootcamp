var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash    = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User = require("./models/user"),
    seedDB   = require ("./seeds")
    
var   commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v8");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the database

var campgrounds = [
        
        {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
        {name: "Desert Mesa",  image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"},
        {name: "Canyon Floor", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg"},
         {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
        {name: "Desert Mesa",  image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"},
        {name: "Canyon Floor", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg"}
        ];

// passport configation
app.use(require("express-session")({
    secret: "you are the best!",
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
    res.locals.message = req.flash("error");
    next();
});

// requring routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("The YelpCamp started!!")
});