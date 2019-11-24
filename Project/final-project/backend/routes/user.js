const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/user");

const router = express.Router();


router.post("/signup", (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
    })
  });
  // bcrypt.hash(req.body.password, 10)
  //   .then(hash => {

  //     user.save()
  //       .then(result => {
  //         res.status(201).json({
  //           message: "User created!",
  //           result: result
  //         });
  //       })
  //       .catch( err => {
  //         res.status(500).json({
  //           error:err
  //         });
  //       });
  // });
});



module.exports = router;
