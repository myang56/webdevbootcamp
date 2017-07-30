var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});


// POST - titel, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);
// user - email, name

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});

var User = mongoose.model("User", userSchema);

var newUser = new User({
  email: "haha@wisc.edu",
  name: "haha ye"
});

newUser.posts.push({
    title: "be happy",
    content: "be happy everyday"
});

newUser.save(function(err, user){
    
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

// var newPost = new Post({
    
//     title: "Relections on Apple",
//     content: "They are delicious"
// });

// newPost.save(function(err,post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


User.findOne({name:"haha ye"}, function(err, user){
    
    if (err){
        console.log(err);
    } else {
        user.posts.push({
            title: "3 things i realy hate",
            content: "chem chem chem"
        });
        user.save(function(err, user){
            
            if (err){
                // console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});