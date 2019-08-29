const express = require('express') ;
const app = express() ;
const fs = require('fs') ;



// pattern = /(\d+) ((\w+ )+)SID: .* SchemeID: .*(\r\n)+((\d+\(\d\) *)+)(\r\n)+(\d+ \d+ *)+(\r\n)+([0-9]+)(\r\n)+(\d+\(.+\) *)(\r\n)+/g ;
pattern = /Institution Code: (\d+)(\r\n)+Institution: ((.* *)+)/g ;
sdata = `{ ` ;
fs.readFile('./2/cse.txt', (err, data) => {
    if(err) throw err ;
    data = data.toString() ;
    while( (results = pattern.exec(data)) != null ) {
        sdata += `"${results[1]}" : { 
                                    "college" : "${results[3]}"
                                  } ,
                                    ` ;
        console.log("code : " + results[1] + " papercode : " + results[3] + " subject : " + results[4]) ;
    }
    sdata += ` }` ;
    fs.writeFile('./institute.json', sdata) ;
    //results = data.match(pattern) ;
    /*results.forEach( element => {
        console.log(element) ;
    });*/
    //console.log(data.toString()) ;
})
