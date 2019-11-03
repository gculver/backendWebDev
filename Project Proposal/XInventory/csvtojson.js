var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
const csvFilePath = './soldInventory.csv';
const csv = require('csvtojson');

var app = express();
var upload = upload.single('soldInventory.csv');
csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
    //console.log(jsonObj);
})

csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
    const myString = ',';
    const newInventory = [];
    var counter = jsonObj.length;
    for(var i = 0; i < counter; i++) {
        let myString = ' ';
        let vehicle = jsonObj[i]["Vehicle"].split(myString);
        //console.log(vehicle[0]);
        const newInventory = {
            Year: vehicle[0],
            Make: vehicle[1],
            Model: vehicle[2],
            Trim: vehicle[3],
            StockNumber: jsonObj[i]["Stock #"],
            VinNumber: jsonObj[i]["VIN"],
            Class: jsonObj[i]["Class"],
            Age: jsonObj[i]["Age"],
            Body: jsonObj[i]["Body"],
            Color: jsonObj[i]["Color"],
            Cost: jsonObj[i]["Cost"],
            Odometer: jsonObj[i]["Odometer"]
        };
        
        /*new Inventory(newInventory)
            .save()
            .then(inventory => {
                //console.log(counter);
            })*/
        console.log(newInventory);

        // NOW I NEED TO CREATE AN STORE EACH INSTANCE IN A DATABASE
    }
})
