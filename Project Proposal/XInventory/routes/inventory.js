const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');

// Below used to upload file form
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

//const upload = multer({ dest: 'uploads/'});
const upload = multer ({ storage: storage });
const type = upload.single('inventoryFile');
const csvFilePath = './uploads/inventoryFile';
const router = express.Router();

// Load Inventory Model
require('../models/Inventory');
const Inventory = mongoose.model('inventory');

// Inventory Route
router.get('/', (req, res) => {
    Inventory.find({})
    .sort({StockNumber: 'desc'})
    .then(inventory => {
        res.render('inventory', {
            inventory:inventory
        });
    });   
});

// Add Inventory Route
router.get('/add', (req, res) => {
    res.render('inventory/add');
});

// Add Inventory Route
router.get('/addInventory', (req, res) => {
    res.render('inventory/addInventory');
});

// Add inventory Counts to Form
router.get('/displayInventory', (req, res) => {
    Inventory.aggregate([
   
    { $group: {_id: "$Model", make: {$first: "$Make"}, num_products: {"$sum":1 }}}
    
    ],
    function(err, results) {
        console.log(results);
        res.render('inventory/displayInventory', { results })
    });
});

/*
// Add Inventory To Form
router.get('/displayInventory', (req, res) => {
    Inventory.find({})
    .sort({StockNumber: 'desc'})
    .then(inventory => {
        res.render('inventory/displayInventory', {
            inventory:inventory
        });
    });
    
});
*/
router.post('/', type, function(req, res) {
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
        new Inventory(newInventory)
            .save()
            
    }  
})
    req.flash('success_msg', 'Inventory Uploaded Successfully');
    res.redirect('inventory/displayInventory');
});


module.exports = router;