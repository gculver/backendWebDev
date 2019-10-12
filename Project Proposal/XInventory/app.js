const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Mongoose Connection
mongoose.connect('mongodb://localhost/Xinventory', {
    useMongoClient: true
})
.then( () => 
    console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Load Inventory Model
require('./models/Inventory');
const Inventory = mongoose.model('inventory');

// Initialize express
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Index Route
app.get('/', (req, res) => {
    const title = '10X Inventory';
    res.render('index', {
        title: title
    });
});

// Inventory Route
app.get('/inventory', (req, res) => {
    res.render('inventory');
    
});

// Settings Route
app.get('/settings', (req, res) => {
    res.render('settings');
});

// Register Route
app.get('/register', (req, res) => {
    res.render('register');
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

// Add Inventory Route
app.get('/inventory/add', (req, res) => {
    res.render('inventory/add');
});

// Process Form
app.post('/inventory', (req, res) => {
   // Server Side Validation
   let errors = [];
   if(!req.body.title) {
       errors.push({text: 'Please enter a Make.'});
   }
   if(!req.body.stockNum) {
       errors.push({ text: 'Please enter a stock number.'});
   }

   if(errors.length > 0) {
       res.render('inventory/add', {
           errors: errors,
           title: req.body.title,
           stockNum: req.body.stockNum
       });
   } else {
       res.send('Passed');
   }
});

// Process Settings Form
app.post('/settings', (req, res) => {
    // Server side validation
    let errors = [];
    if(req.body.allYears) {
        errors.push({ text: 'Please Fill Out Form Correctly'});
    }
    
    if(errors.length > 0) {
        res.render('settings', {
            errors: errors,
            inputYear: req.body.inputYear
        });
    } else {
        console.log('Input Year: ' + req.body.inputYear);
        console.log('Make: ' + req.body.inputMake);
        res.send('Submitted Inventory Settings!  Good Job!!' + 'Input Year:' + req.body.inputYear);
        
    }
});


// Local Development Port
const port = 5000;



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});