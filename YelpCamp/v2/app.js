var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

// scheme setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
//     name: "Lake", 
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92FMY4PT8DdmB1SZ9yKLwshlVFKXIZVjfcI-Nl7kmtYGuf-Tv",
//     description: "This is a hug granit hill"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });




var campgrounds = [
        
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"},
        {name: "Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92FMY4PT8DdmB1SZ9yKLwshlVFKXIZVjfcI-Nl7kmtYGuf-Tv"},
        {name: "Mountain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"},
        {name: "Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92FMY4PT8DdmB1SZ9yKLwshlVFKXIZVjfcI-Nl7kmtYGuf-Tv"},
        {name: "Mountain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"},
        {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"},
        {name: "Lake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92FMY4PT8DdmB1SZ9yKLwshlVFKXIZVjfcI-Nl7kmtYGuf-Tv"},
        {name: "Mountain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvep262qr1v59S3EvWZlzT4L8L9qylIaA5Vo7i1WiCkN5AH_de"}
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
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
             // render show template with that campground
            res.render("show", {campground : foundCampground});
        }
    });
    
});




app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("The YelpCamp started!!")
});