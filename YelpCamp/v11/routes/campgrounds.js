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
router.post("/",isLoggedIn, function(req, res){
    
    // res.send("You HIT THE POST ROUTE!");
    // get data form and add to campgrounds
    // redirect back to campground
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampground = {name: name, image : image, description: desc, author: author};
    // campgrounds.push(newCampground);

    // create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
              // redirect back to campgrounds page
              console.log(newlyCreated);
              res.redirect("/campgrounds");
        }
        
    });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
    
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


// Edit campground route
router.get("/:id/edit", checkCampgroundOwnerShip, function(req, res) {
     Campground.findById(req.params.id, function(err, foundCampground) {
         
         // is user logged in
        res.render("campgrounds/edit", {campground: foundCampground});
             
});
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id",checkCampgroundOwnerShip, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// Destory campground route
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

function checkCampgroundOwnerShip (req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}


function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;