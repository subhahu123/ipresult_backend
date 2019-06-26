const express = require('express') ;
const app = express() ;

app.listen(8080, "localhost", function() {
    console.log("appt satr ") ;
}) ;

app.get('/', function(req, res) {
    res.send({some: "hello worldl", SM: "AA"}) ;
})