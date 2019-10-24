const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        // Match User
        User.findOne({
            email:email
        }).then(user => {
            if (!user) {
                return done(null, false, {message: 'No User Found'});
            } 

            // Match Password
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'The password is incorrect'});
                }
            })
        })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    });
}