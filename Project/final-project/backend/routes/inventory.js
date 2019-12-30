const express = require('express');
const Inventory = require('../models/inventory');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require("multer");
const csv = require('csvtojson');
const mongoose = require('mongoose');

// Import path to backend/models/inventory.js
require('../models/inventory');


// Import path to backend/models/soldInventory.js
require('../models/soldInventory');
const soldInventory = mongoose.model('soldInventory');

// Constant Storage thru current csv file path same as app.js
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/uploadedcsvfiles') // This is where ALL CSV files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

const upload = multer({ storage: storage });
const type = upload.single('soldInventory');  // changed from soldInventory --> If I change this I get an error?
const soldType = upload.single('soldInventory'); // This is for sold inventory file
const currentType = upload.single('currentInventory'); // This is for current inventory file

const soldCsvFilePath = './backend/uploads/uploadedcsvfiles/soldInventory.csv'; // Import path for sold inventory file
const currentCsvFilePath = './backend/uploads/uploadedcsvfiles/currentInventory.csv'; // Import path for current inventory file

router.get('', checkAuth, (req, res, next) => {
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
])
.then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        inventories: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching Inventory Failed!'
      });
    })
});

// router.post('/add', function(req, res) {
//   csv()
//     .fromFile(csvFilePath)
// })

// Import route for currentInventory.csv file resides in uploads/uploadedcsvfiles
router.post('/add', checkAuth, currentType, function (req, res) {
  csv()
    .fromFile(currentCsvFilePath)
    .then((jsonObj) => {
      const myString = ',';
      const currentInventory = [];
      var counter = jsonObj.length;
      for (var i = 0; i < counter; i++) {
        let myString = ' ';
        let vehicle = jsonObj[i]["Vehicle"].split(myString);
        const currentInventory = {
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
       // Inventory.deleteMany({}); // Trying to replace inventory before I just add on to it?
        new Inventory(currentInventory).save(); // Saving and overriding mongoose database
        console.log(i + ' File Uploaded in DB');
      }
    });
    // Sending Message back to Inventory Service so it redirects to home page but there is a major delay??
    res.status(201).json({
      message: 'Inventory Added'
    });
});


// Route for uploading sold inventory
router.post('/addSold',checkAuth, soldType, function(req, res) {
  console.log(soldCsvFilePath);
  csv()
  .fromFile(soldCsvFilePath) // Import path to soldInventory.csv
  .then((jsonObj) => {
      const myString = ',';
      const soldInv = [];
      var counter = jsonObj.length;
      for(var i = 0; i < counter; i++) {
          let myString = ' ';
          let vehicle = jsonObj[i]["Vehicle"].split(myString);
          console.log(vehicle[0]);
          const soldInv = {
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
  new soldInventory(soldInv).save()
  console.log(i + ' Sold Items');
  }
  });
  res.status(201).json({
    message: 'Inventory Added'
  });

});
module.exports = router;
