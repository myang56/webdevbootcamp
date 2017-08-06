
var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");

// Index - show all campgrounds
router.get("/", function(req, res) {
    
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser: req.user});
        }
        
    });
        
});  

// create-- add new campground to DB
router.post("/", function(req, res){
    
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

// NEW - show form to create new campground
router.get("/new", function(req, res){
    
    res.render("campgrounds/new");
});


// show- shows more info about one campground
router.get("/:id", function(req, res){
    
    // find the campgound with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if (err){
            console.log(err);
        } else {
            console.log(foundCampground);
             // render show template with that campground
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
    
});



module.exports = router;