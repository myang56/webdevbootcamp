var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient: true});

var Post = require("./models/post");
var User = require("./models/user");

// reference the current dir use "./"

Post.create({
    title: " how to cook version 4",
    content: "hahahahhahaha" 
}, function(err, post){
    User.findOne(
        {email: "bob@gmail.com"},
        function(err, foundUser){ 
            if(err){
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
});


// find user
// find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });



// User.create({
//     email: "bob@gmail.com",
//     name: "bob belcher"
// });
