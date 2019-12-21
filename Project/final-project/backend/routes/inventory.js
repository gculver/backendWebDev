const express = require('express');
const Inventory = require('../models/inventory');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require("multer");
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

const upload = multer ({ storage: storage });
const type = upload.single('inventoryFile');
const csvFilePath = './uploads/inventoryFile';

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

router.post('/add', function(req, res) {
  csv()
    .fromFile(csvFilePath)
})

module.exports = router;
