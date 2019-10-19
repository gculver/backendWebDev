const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Month Supply Schema
const MonthSupplySchema = new Schema ({
    Make: {
    type: String,
    required: false
    }, 
    Model: {
    type: String,
    required: false
    }, 
    MonthSupply: {
    type: Number,
    required: true
    }
});

mongoose.model('monthSupply', MonthSupplySchema);