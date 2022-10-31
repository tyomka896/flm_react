
const {PythonShell} = require("python-shell")

let options = {
    scriptPath: 'D:/pyshell',
    args:["12", 'John'],
    pythonOptions:['-u'],

};
PythonShell.run("check.py", options, (err, res) =>{
if(err) console.log(err)
if (res) {
    const  iconv= require('iconv-lite');
    const { StringDecoder } = require('string_decoder');
    const decoder = new StringDecoder('windows-1251');
    const fs = require("fs");

    //console.log('РїСЂРёРІРµС‚')
    let cw = iconv.encode(iconv.decode(Buffer.from(res[0],'binary'), 'win1251'), 'utf8').toString();
    let c = iconv.decode(Buffer.from(res[0]), 'utf8').toString();
    fs.writeFile("D:/pyshell/result_filename.txt", res[0], () => { })


    let body
 body = new Buffer.from(res[0], 'binary')
//let conv = new iconv.Iconv('windows-1251', 'utf8');
 //body = conv.convert(body).toString();


 let star = "1+TM(2) ==> \xd0\xbd\xd0\xb5\xd1\x81\xd0\xba\xd0\xbe\xd0\xbb\xd1\x8c\xd0\xba\xd0\xbe \xd0\xb2\xd0\xbe\xd0\xb7\xd0\xbc\xd0\xbe\xd0\xb6\xd0\xbd\xd0\xbe\xd1\x81\xd1\x82\xd0\xb5\xd0\xb9 \xd0\xb4\xd0\xbb\xd1\x8f \xd0\xbf\xd1\x80\xd0\xbe\xd1\x81\xd1\x87\xd0\xb5\xd1\x82\xd0\xb0(2) = {1: 0.5, 2: 0.5}"
let pop = ""+String(res[0])

 let st =  String(iconv.decode(Buffer.from(res[0]), 'utf8').toString())
 let str = iconv.decode(Buffer.from(pop, 'binary'), 'utf8').toString()


 const cent = Buffer.from(star,'binary')
//console.log(decoder.write(cent.toString()))
//console.log(iconv.decode(Buffer.from(st,'binary'), 'utf8').toString())


let strong = "привет" + res[0]
let lett = iconv.decode(iconv.encode(Buffer.from(strong, "binary"), 'utf8'), 'utf8').toString();
var message = iconv.decode(Buffer.from(strong), "win1251")
 message = iconv.encode(message, "win1251").toString();
//
 console.log(message)
}

});

