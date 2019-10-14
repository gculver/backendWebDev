const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const readFile = require('fs').readFile;

// Below used to upload file form
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});
//const upload = multer({ dest: 'uploads/'});
const upload = multer ({ storage: storage });
const type = upload.single('inventoryFile');
const csvFilePath = './uploads/inventoryFile';
const csv = require('csvtojson');


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

// Add Inventory Route
app.get('/inventory/addInventory', (req, res) => {
    res.render('inventory/addInventory');
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
    console.log(req.body.title);
    const newInventory = {
        Vehicle: req.body.title,
        StockNumber: req.body.stockNum
    }
    new Inventory(newInventory)
    .save()
    .then(inventory => {
        res.redirect('/inventory');
    });
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
        console.log(req.body.title);
        const newInventory = {
            title: req.body.title,
            stockNum: req.body.stockNum
        }
        new Inventory(newUser)
        .save()
        .then(inventory => {
            console.log('body' + req.body);
            res.redirect('/inventory');
        });
        
    }
});


app.post('/addInventory', type, function(req, res) {
    res.redirect('/inventory');
});

csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
    const newInventory = [];
    var counter = jsonObj.length;
    for(var i = 0; i < counter; i++) {
        const newInventory = {
            Vehicle: jsonObj[i].Vehicle,
            StockNumber: jsonObj[i]["Stock #"],
            VinNumber: jsonObj[i]["VIN"],
            Class: jsonObj[i]["Class"],
            Age: jsonObj[i]["Age"],
            Body: jsonObj[i]["Body"],
            Color: jsonObj[i]["Color"],
            Cost: jsonObj[i]["Cost"],
            Odometer: jsonObj[i]["Odometer"]
        };
        
        
        console.log(newInventory);

        // NOW I NEED TO CREATE AN STORE EACH INSTANCE IN A DATABASE
    }
    
   
})

    

// Local Development Port
const port = 5000;



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});