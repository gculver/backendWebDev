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
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Body: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    Disp: {
        type: String,
        required: true
    },
    Cost: {
        type: Number,
        required: true
    }, 
    Odometer: {
        type: Number,
        required: false
    }

});

mongoose.model('inventory', IventorySchema );