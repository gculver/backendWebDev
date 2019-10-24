const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const readFile = require('fs').readFile;
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');

// Load helper 
const {ensureAuthenticated} = require('./helpers/auth');

const app = express();

// Load Routes
const inventory = require('./routes/inventory');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

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

// Load MonthSupply Model
require('./models/MonthSupply');
const MonthSupply = mongoose.model('monthSupply');


// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Index Route
app.get('/', ensureAuthenticated, (req, res) => {
    res.render('index');
});

// Settings Route
app.get('/settings', ensureAuthenticated,  (req, res) => {
    res.render('settings');
});

// Process Settings Form
app.post('/settings', ensureAuthenticated, (req, res) => {
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
            req.flash('success_msg', 'Settings Successfully Updated')
            res.redirect('/inventory');
        });  
    }
});

// User Routes 
app.use('/inventory', inventory);
app.use('/users', users);

// Local Development Port
const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});