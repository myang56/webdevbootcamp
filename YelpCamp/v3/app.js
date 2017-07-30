var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    Campground = require("./models/campground");
    seedDB   = require ("./seeds");
    
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgrounds = [
        
        {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
        {name: "Desert Mesa",  image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"},
        {name: "Canyon Floor", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg"},
         {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
        {name: "Desert Mesa",  image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"},
        {name: "Canyon Floor", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg"}
        ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allcampgrounds});
        }
        
    });
        
        // 
});  

app.post("/campgrounds", function(req, res){
    
    // res.send("You HIT THE POST ROUTE!");
    // get data form and add to campgrounds
    // redirect back to campground
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image : image, description: desc};
    // campgrounds.push(newCampground);
    
    // create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
              // redirect back to campgrounds page
              res.redirect("/campgrounds");
        }
        
    });
});


app.get("/campgrounds/new", function(req, res){
    
    res.render("new");
});


// show- shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    
    // find the campgound with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if (err){
            console.log(err);
        } else {
            console.log(foundCampground);
             // render show template with that campground
            res.render("show", {campground : foundCampground});
        }
    });
    
});




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("The YelpCamp started!!")
});