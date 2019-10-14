const express = require('express');
const app = express();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

const upload = multer({
  storage: storage // this saves your file into a directory called "uploads"
});


var type = upload.single('file-to-upload');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', type, function(req, res) {
    res.redirect('/');
});

fs.createReadStream('uploads/file-to-upload.csv') 
    .pipe(csv()) 
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('done');
    });

 

app.listen(3000);