const express = require('express') ;
const app = express() ;
const fs = require('fs') ;



// pattern = /(\d+) ((\w+ )+)SID: .* SchemeID: .*(\r\n)+((\d+\(\d\) *)+)(\r\n)+(\d+ \d+ *)+(\r\n)+([0-9]+)(\r\n)+(\d+\(.+\) *)(\r\n)+/g ;
pattern = /(\d+) (\d+)\n+(\w+) ((\w+ *)+)/g ;
sdata = `{ ` ;
fs.readFile('./subjects.txt', (err, data) => {
    if(err) throw err ;
    data = data.toString() ;
    while( (results = pattern.exec(data)) != null ) {
        sdata += `"${results[2]}" : { 
                                    "papercode" : "${results[3]}" ,
                                    "subject" : "${results[4]}" 
                                  } ,
                                    ` ;
        console.log("code : " + results[2] + " papercode : " + results[3] + " subject : " + results[4]) ;
    }
    sdata += ` }` ;
    fs.writeFile('./subjects.json', sdata) ;
    //results = data.match(pattern) ;
    /*results.forEach( element => {
        console.log(element) ;
    });*/
    //console.log(data.toString()) ;
})
