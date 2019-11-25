const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Inventory = require('./models/inventory');

const session = require('express-session');

const app = express();

// Load Routes
const inventory = require('./routes/inventory');
const user = require('./routes/user');

// DB Config
const db = require('./config/database');

// Mongoose Connection
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
.then( () =>
  console.log('MongoDB Connencted...'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTION');
  next();
});

app.post('/api/inventory', (req, res, next) => {
  const inventory = new Inventory({
    Year: req.body.year,
    Make: req.body.make,
    Model: req.body.model,
    StockNumber: req.body.stockNum

  });
  post.save();
  //console.log(inventory);
  res.status(201).json({
    message: 'Inventory added succesfully'
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);

})

// app.get('/api/inventory', (req, res, next) => {
//   Inventory.aggregate([{
//     $group: {
//             _id: "$Model",
//             make: { $first: "$Make" },
//             num_products: { "$sum": 1 }
//         }
//     },
//     {
//     $lookup:
//         {
//             from: "soldinventories",
//             localField: "_id",
//             foreignField: "Model",
//             as: "inventory_docs"
//         }
//     },
//     {
//     $project:
//         {
//             _id: 1,
//             make: 1,
//             num_products: 1,
//             sold: {$size: "$inventory_docs"}
//         }
//     },
//     { $sort: { make: 1, _id: 1 } },
// ])
// .then(documents => {
//       //console.log(documents);
//       res.status(200).json({
//         message: 'Posts fetched successfully',
//         inventories: documents
//       });
//     });
//   // Inventory.find()
//   //   .then(documents => {
//   //     console.log(documents);
//   //     res.status(200).json({
//   //       message: 'Posts fetched successfully',
//   //       inventories: documents
//   //     });
//   //   });
// });

// //module.exports = app;

// User Routes
app.use('/api/inventory', inventory);
app.use('/api/users', user);


// Local Development Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
