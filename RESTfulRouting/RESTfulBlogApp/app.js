var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose   = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    express    = require("express"),
    app        = express();
    

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
    
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8aI_8OCcCBb31pWF7_xfK6iv-_zcJFjAT8vxZ9tTQ5mafxLRQNQ",
//   body: "Hello This is a blog post!"
    
// });

// restful routes


app.get("/", function(req,res){
    
    res.redirect("/blogs");
  
});


// index route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});



// new route

app.get("/blogs/new", function(req, res){
    res.render("new");
});


// create post
app.post("/blogs", function(req, res){
    // create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});


// show route
app.get("/blogs/:id", function(req, res){
    
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});



// edit route
app.get("/blogs/:id/edit", function(req, res){
    
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
        
    });

});

// update route
app.put("/blogs/:id", function(req, res){
     req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// delete route
app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
   
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
});