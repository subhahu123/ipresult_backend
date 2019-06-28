const express = require('express') ;
const app = express() ;
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

Mongoose.connect("mongodb://result:ipusem3@ds211029.mlab.com:11029/ipresults") ;

var studentSchema = new Mongoose.Schema({
    rollNo: String,
    name: String,
    results: { type: [{
        subject: String,
        marks: String
    }] }
});

const studentModel = Mongoose.model("student", studentSchema);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/students", async (request, response) => {
    try {
        var result = await studentModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen( process.env.PORT || 8080, "localhost", function(data) {
    console.log(data + "App is running at localhost:8080") ;
}) ;