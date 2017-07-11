var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("Hi there");
});


app.get("/bye", function(req, res){
    
    res.send("good bye!");
    
});

app.get("/dog", function(req, res){
    
    console.log("someone ahoiewroi");
    res.send("meow");
    
});


app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    res.send("welcome to ");
});


app.get("/r/:subredditName/:comments/:id/:title", function(req, res){
    console.log(req.params);
    res.send("welcome to the page ");
});

app.get("*", function(req, res){
    
    res.send("YOU ARE A STAR!!!");
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started!!!");
});