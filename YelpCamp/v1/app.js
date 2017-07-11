var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("there will be the landing page");
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("The YelpCamp started!!")
});