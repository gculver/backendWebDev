const express = require('express');


const app = express();

app.use('/api/inventory', (req, res, next) => {
  const inventories = [
    { id: 'dafafa', make: 'Chevy', model: 'Tahoe'},
    { id: 'dafadfadffa', make: 'Chevy', model: 'equionox'},
    { id: 'dafafa', make: 'Chevy', model: 'truck'},
  ];
  res.status(200).json({ message: 'Posts fetched successfully', inventories});
});

module.exports = app;
