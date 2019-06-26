const express = require('express') ;
const app = express() ;
const Mongoose = require("mongoose");
const fs = require('fs') ;

// Mongoose.connect("mongodb://result:ipusem3@ds211029.mlab.com:11029/ipresults") ;

const datapath = "./data.txt" ;

pattern = /(\d+) ((\w+ )+)SID: .* SchemeID: .*(\r\n)+((\d+\(\d\) *)+)(\r\n)+(\d+ \d+ *)+(\r\n)+([0-9]+)(\r\n)+(\d+\(.+\) *)(\r\n)+/g ;


fs.readFile('./data.txt', (err, data) => {
    if(err) throw err ;
    data = data.toString() ;
    results = data.match(pattern) ;
    console.log(results) ;
    //console.log(data.toString()) ;
})

/* var text = fs.readFileSync(datapath).toString('utf-8');
console.log(text) ;
console.log(text.match(pattern)) ; */


app.listen( process.env.PORT || 8080, "localhost", function(data) {
    console.log(data + "App is running at localhost:8080") ;
}) ;

app.get('/', function(req, res) {
    res.send({some: "hello worldl", SM: "AA"}) ;
})