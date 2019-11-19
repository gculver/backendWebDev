const express = require('express');
const bodyParser = require('body-parser');

const Inventory = require('./models/inventory');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
  console.log(inventory);
  res.status(201).json({
    message: 'Inventory added succesfully'
  });
});
app.use('/api/inventory', (req, res, next) => {
  const inventories = [
    { id: 'dafafa', make: 'Chevy', model: 'Tahoe'},
    { id: 'dafadfadffa', make: 'Chevy', model: 'equionox'},
    { id: 'dafafa', make: 'Chevy', model: 'truck'},
  ];
  res.status(200).json({ message: 'Posts fetched successfully', inventories});
});

module.exports = app;
