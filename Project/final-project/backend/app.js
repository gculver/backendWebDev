const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');

// const Inventory = require('./models/inventory');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './backend/uploads/uploadedcsvfiles') // This is where ALL CSV files will be uploaded
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname);
//   }
// });

// const upload = multer({ storage: storage });
// //const type = upload.single('soldInventory');  // changed from soldInventory --> If I change this I get an error?
// const soldType = upload.single('soldInventory'); // This is for sold inventory file
// const currentType = upload.single('currentInventory'); // This is for current inventory file

// const soldCsvFilePath = './backend/uploads/uploadedcsvfiles/soldInventory.csv'; // Import path for sold inventory file
// const currentCsvFilePath = './backend/uploads/uploadedcsvfiles/currentInventory.csv'; // Import path for current inventory file

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// // Import route for currentInventory.csv file resides in uploads/uploadedcsvfiles
// app.post('/add', currentType, function (req, res) {
//   csv()
//     .fromFile(currentCsvFilePath)
//     .then((jsonObj) => {
//       const myString = ',';
//       const currentInventory = [];
//       var counter = jsonObj.length;
//       for (var i = 0; i < counter; i++) {
//         let myString = ' ';
//         let vehicle = jsonObj[i]["Vehicle"].split(myString);
//         const currentInventory = {
//           Year: vehicle[0],
//           Make: vehicle[1],
//           Model: vehicle[2],
//           Trim: vehicle[3],
//           StockNumber: jsonObj[i]["Stock #"],
//           VinNumber: jsonObj[i]["VIN"],
//           Class: jsonObj[i]["Class"],
//           Age: jsonObj[i]["Age"],
//           Body: jsonObj[i]["Body"],
//           Color: jsonObj[i]["Color"],
//           Cost: jsonObj[i]["Cost"],
//           Odometer: jsonObj[i]["Odometer"]
//         };
//        // Inventory.deleteMany({}); // Trying to replace inventory before I just add on to it?
//         new Inventory(currentInventory).save(); // Saving and overriding mongoose database
//         console.log(i + ' File Uploaded in DB');
//       }
//     });
//     // Sending Message back to Inventory Service so it redirects to home page but there is a major delay??
//     res.status(201).json({
//       message: 'Inventory Added'
//     });
// });

// Remove later.  This is from single upload. Old Test
// app.post('/api/inventory', (req, res, next) => {
//   const inventory = new Inventory({
//     Year: req.body.year,
//     Make: req.body.make,
//     Model: req.body.model,
//     StockNumber: req.body.stockNum

//   });
//   post.save();
//   //console.log(inventory);
//   res.status(201).json({
//     message: 'Inventory added succesfully'
//   });
// });

// Remove later.  Was for initial registration test.
// app.post('/register', (req, res) => {
//   console.log(req.body);
// })

// User Routes
app.use('/api/inventory', inventory);
app.use('/api/users', user);


// Local Development Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
