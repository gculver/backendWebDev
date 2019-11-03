const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');
const exphbs = require('express-handlebars');

// Load helper 
const {ensureAuthenticated} = require('../helpers/auth');

// Below used to upload file form
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

const upload = multer ({ storage: storage });
const type = upload.single('inventoryFile');
const csvFilePath = './uploads/inventoryFile';

// Sold Inventory File
const typeOne = upload.single('soldInventory');
const soldFilePath = './uploads/soldInventory';

const router = express.Router();

// Load Inventory Model
require('../models/Inventory');
const Inventory = mongoose.model('inventory');

// Load soldInventory Model
require('../models/soldInventory');
const soldInventory = mongoose.model('soldInventory');

// Inventory Route
router.get('/', ensureAuthenticated, (req, res) => {
    Inventory.find({})
    .sort({StockNumber: 'desc'})
    .then(inventory => {
        res.render('inventory', {
            inventory:inventory
        });
    });   
});

// Add Inventory Route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('inventory/add');
});

// Add Inventory Route
router.get('/addInventory', ensureAuthenticated, (req, res) => {
    res.render('inventory/addInventory');
});

// Add POST method inventory page after login
router.post('/displayInventory', ensureAuthenticated, (req, res) => {
    Inventory.aggregate([
    { $group: {_id: "$Model", make: {$first: "$Make"}, num_products: {"$sum":1 }}}
    ],
    function(err, results) {
        //console.log(results);
        res.render('inventory/displayInventory', { results })
    });
});

// Add inventory Counts to Form
router.get('/displayInventory', ensureAuthenticated, (req, res) => {
    Inventory.aggregate([{ 
        $group: {
                _id: "$Model",
                make: { $first: "$Make" },
                num_products: { "$sum": 1 }
            }
        },
        {
        $lookup: 
            { 
                from: "soldinventories",
                localField: "_id",
                foreignField: "Model",
                as: "inventory_docs"
            }
        },
        {
        $project:
            {
                _id: 1,
                make: 1,
                num_products: 1,
                sold: {$size: "$inventory_docs"}
            }
        },
        { $sort: { make: 1, _id: 1 } },
    ],
    function(err, results) {
    
    console.log(results);
    res.render('inventory/displayInventory', { results })
    });
});

router.post('/', ensureAuthenticated, type, function(req, res) {
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


// Route for uploading sold inventory
router.post('/addSold',ensureAuthenticated, typeOne, function(req, res) {
    csv()
    .fromFile(soldFilePath)
    .then((jsonObj) => {
        const myString = ',';
        const soldFile = [];
        var counter = jsonObj.length;
        for(var i = 0; i < counter; i++) {
            let myString = ' ';
            let vehicle = jsonObj[i]["Vehicle"].split(myString);
            console.log(vehicle[0]);
            const soldFile = {
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
    new soldInventory(soldFile)
        .save() 
        }   
    })
    req.flash('success_msg', 'Inventory Uploaded Successfully');
    res.redirect('/inventory/displayInventory');
});

module.exports = router;