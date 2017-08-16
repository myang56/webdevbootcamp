var express = require("express");
var router = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment = require("../models/comment");


// comments/new
router.get("/new", isLoggedIn, function(req,res){
    
    // find camground by id
 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
          res.render("comments/new", {campground: campground});
        }
    })
    
  
})

//comentes create
router.post("/", isLoggedIn,  function(req, res){
    
    // lookup campground using id
 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                   
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnerShip, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// comment update
router.put("/:comment_id", checkCommentOwnerShip, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// comemnt destroy route
router.delete("/:comment_id", checkCommentOwnerShip, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

function checkCommentOwnerShip(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
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
