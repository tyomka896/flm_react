const express = require('express');
const app = express();
var multer = require('multer')
var cors = require('cors');
var mess = ""
app.use(cors())
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/xmlS')
  },
  filename: function (req, file, cb) {
    cb(null, 'FLMmodel.xml' )//file.originalname *.flm
  }
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(8000, function() {

    console.log('server running on port 8000');

});
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
    const decoder = new StringDecoder('utf8');
    const fs = require("fs");
    let star = "\\xd0\\xbd\\xd0\\xb5\\xd1\\x81\\xd0\\xba\\xd0\\xbe\\xd0\\xbb\\xd1\\x8c\\xd0\\xba\\xd0\\xbe"
    let pop = String(res[0])
    let substr = pop.substring(2)
    let starr = substr.toString()
    substr =substr.slice(0,-1)    
    let buffer1 = new Buffer.from(res[0]) 
    let ars = substr.split(' ')
    
    for (let i = 0; i<ars.length; i++ )
    {
      if(ars[i][0] == '\\')
      {
        ars[i] = replaceAll(ars[i],'\\x',"")
        ars[i] = iconv.decode(Buffer.from(ars[i], "hex"), "utf8").toString()
      }
    }
    
    ars = ars.join(' ')
    fs.writeFile("D:/pyshell/result_filename.txt", ars, () => { }) //iconv.encode(ars, 'win1251')
    mess = ars
}});

app.get('/api', (req, res) => {
res.json({
  message: mess
})})

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}