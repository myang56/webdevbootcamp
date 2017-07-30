var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    
        
        res.render("campgrounds", {campgrounds:campgrounds});
});  

app.post("/campgrounds", function(req, res){
    
    // res.send("You HIT THE POST ROUTE!");
    // get data form and add to campgrounds
    // redirect back to campground
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image : image};
    campgrounds.push(newCampground);
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
    
});


app.get("/campgrounds/new", function(req, res){
    
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("The YelpCamp started!!")
});