const express = require('express') ;
const app = express() ;
const Mongoose = require("mongoose");

Mongoose.connect("mongodb://result:ipusem3@ds211029.mlab.com:11029/ipresults") ;

app.listen( process.env.PORT || 8080, "localhost", function(data) {
    console.log(data + "App is running at localhost:8080") ;
}) ;

app.get('/', function(req, res) {
    res.send({some: "hello worldl", SM: "AA"}) ;
})