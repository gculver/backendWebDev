const Inventory = require('../models/inventory');


exports.createInventory = (req, res, next) => {
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
}
