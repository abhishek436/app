const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req,res,next) => {
    var user = new User();
    user.Name = req.body.Name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err,doc) => {
        if(!err) {
            res.send(doc);
        } 
        else {
            if(err.code == 11000) {
                res.status(422).send(['Duplicate email address']);
            }
            else {
                return next(err);
            }
        }
    });
}

module.exports.authenticate = (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err) { 
            return res.status(404).json(err);
        }
        if(user) {
            return res.status(200).json({ "token" : user.generateJwt() });
        }
        else {
            return res.status(401).json(info);
        }
    })(req,res);
}

module.exports.userProfile = (req,res,next) => {
    User.findOne({ _id : req._id}, 
        (err,user) => {
            if(!user) {
                return res.status(404).json( { status : false , message : 'User record not found. '});
            }
            else {
                return res.status(200).json({ status : true , user : _.pick(user,['Name','email'])});
            }
        });
}
