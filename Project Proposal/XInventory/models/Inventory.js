const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Invetory Schema
const IventorySchema = new Schema({
    Vehicle: {
        type: String, 
        required: true
    },
    StockNumber: {
        type: String,
        required: true
    },
    VinNumber: {
        type: Number,
        required: false
    },
    Class: {
        type: String,
        required: false
    },
    Age: {
        type: Number,
        required: false
    },
    Body: {
        type: String,
        required: false
    },
    Color: {
        type: String,
        required: false
    },
    Disp: {
        type: String,
        required: false
    },
    Cost: {
        type: Number,
        required: false
    }, 
    Odometer: {
        type: Number,
        required: false
    }

});

mongoose.model('inventory', IventorySchema );