const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

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
                return res.status(200).json({ status : true , user : _.pick(user,['_id','Name','email','phone','dob','password'])});
            }
        });
}

module.exports.profileupdate = ((req,res,next) => {
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).json( {status : false, message : `No record with given id : ${req.params.id}`});
    }
    var user  = {
        Name : req.body.Name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        dob : req.body.dob
    }

    User.findByIdAndUpdate(req.params.id, {$set : user}, {new : true} , (err,doc) => {
        if(!err) {
            return res.send(doc);
        }
        else {
            console.log('Error in User Update :' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports.getalluser = ((req,res) => {
    User.find((err,docs) => {
        if(!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports.deleteuser = ((req,res) => {
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    User.findByIdAndRemove(req.params.id, (err,docs) => {
        if(!err) {
            return res.status(200).json({ status : true , message : `user deleted successfully with id ${req.params.id}` });
        }
        else {
            console.log('Error in Deleting User :' + JSON.stringify(err, undefined, 2));
        }
    });
});