const express = require('express');
const app = express();
const Mongoose = require("mongoose");
const fs = require('fs');

// Mongoose.connect("mongodb://result:ipusem3@ds211029.mlab.com:11029/ipresults") ;
//Mongoose.connect("mongodb://ip:results123@ds347367.mlab.com:47367/ipuresult");


var studentSchema = new Mongoose.Schema({
    rollNo: String,
    name: String,
    results: {
        type: [{
            subject: String,
            marks: String
        }]
    }
});


//const studentModel = Mongoose.model("1", studentSchema);
//const studentModel = Mongoose.model("2", studentSchema);
const studentModel = Mongoose.model("4", studentSchema);
//const studentModel = Mongoose.model("4", studentSchema);
//const studentModel = Mongoose.model("5", studentSchema);
//const studentModel = Mongoose.model("6", studentSchema);
//const studentModel = Mongoose.model("7", studentSchema);
//const studentModel = Mongoose.model("8", studentSchema);


const datapath = "./ece.txt";
// patter for all
// pattern = /(\d+) ((\w+ )+)SID: .* SchemeID: .*(\r\n)+((\d+\(\d\) *)+)(\r\n)+(\d+ \d+ *)+(\r\n)+([0-9]+)(\r\n)+(\d+\(.+\) *)(\r\n)+/g;

// patter for sem 1st and sem 4th
//   pattern = /(\d+) ((\w+ )+)SID: .* SchemeID: .*(\r\n)+((\d+\(\d\) *)+)(\r\n)+(.*)(\r\n)(.*)\r\n.*(\r\n)+(\d+\(.+\) *)(\r\n)/g ;
// final patter for  norma = /S.No. Photo. .*\n\nRoll no.\/Name ((\d* .* SID: \d* SchemeID: \d*\n)*)\n((\d*\(.\)\n*)*)\n\nInstitution Code: \d*\n\nInstitution: (.*)\n\n(((\d*\(.\) *)*\n\n.*\n*)*)CS/g
patterfor_normal = /S.No. Photo. .*(\r\n)(\r\n)Roll no.\/Name  *(\r\n)*((\d* .* SID: \d* SchemeID: \d*(\r\n))*)(\r\n)((\d*\(.\)(\r\n)*)*)(\r\n)(\r\n)Institution Code: \d*(\r\n)(\r\n)Institution: (.*)(\r\n)(\r\n)(((\d*\(.\) *)*(\r\n)(\r\n).*(\r\n)*)*)CS/g ;


var dir = './3'

fs.readdir(dir, (err, list) => {
    console.log(list.length);
    list.forEach((file) => {
        console.log(file);
        fs.readFile(dir + '/' + file, (err, data) => {
            if (err) throw err;
            data = data.toString();
            while ((results = patterfor_normal.exec(data)) != null) {
                var student = new studentModel();
                student.rollNo = results[1];
                student.name = results[2];
                var arrSubjects = results[5].split(' ');
                var arrMarks = results[12].split(' ');
                for (var i = 0; i < arrMarks.length; i++)
                    student.results.push({
                        subject: arrSubjects[i],
                        marks: arrMarks[i]
                    })
                //var log = student.save();

                //console.log(log + "\n") ;
               console.log( "Roll No. :" + results[1] + " Name: " + results[2] +  " Subjects :" + results[5] + " " + results[8] + " @ " + results[10] + " Marks :" + results[12] ) ;
            }
            //results = data.match(pattern) ;
            /*results.forEach( element => {
                console.log(element) ;
            });*/
            //console.log(data.toString()) ;
        });
    })

    // console.log("success @@@@@@@@@@@@@%%%%%%%%%%%%%%%%%^^^^^^^") ;
 })


/*
fs.readFile(dir + '/cse.txt', (err, data) => {
    if (err) throw err;
    data = data.toString();
    while ((results = pattern.exec(data)) != null) {
        var student = new studentModel();
        student.rollNo = results[1];
        student.name = results[2];
        var arrSubjects = results[5].split(' ');
        var arrMarks = results[12].split(' ');
        for (var i = 0; i < arrMarks.length; i++)
            student.results.push({
                subject: arrSubjects[i],
                marks: arrMarks[i]
            })
        var log = student.save();

        //console.log(log + "\n") ;
        //    console.log( "Roll No. :" + results[1] + " Name: " + results[2] +  " Subjects :" + results[5] + " " + results[8] + " " + results[10] + " Marks :" + results[12] ) ;
    }
    //results = data.match(pattern) ;
    /*results.forEach( element => {
        console.log(element) ;
    });*/
//console.log(data.toString()) ;
//   });



/* var text = fs.readFileSync(datapath).toString('utf-8');
console.log(text) ;
console.log(text.match(pattern)) ; 


app.listen( process.env.PORT || 8080, "localhost", function(data) {
    console.log(data + "App is running at localhost:8080") ;
}) ;

app.get('/', function(req, res) {
    res.send({some: "hello worldl", SM: "AA"}) ;
}) */