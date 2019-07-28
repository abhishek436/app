const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : 'Name cannot be empty'
    },
    email : {
        type : String,
        required : 'Email can\'t be empty',
        unique : true
    },
    password : {
        type : String,
        required : 'Password cannot be empty',
        minlength : [4,'Password must be 4 character long']
    },
    saltSecret : String
});

userSchema.path('email').validate((val) => {
    emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegx.test(val);
}, 'Invalid e-mail.');

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(this.password, salt, (err,hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifypassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJwt = function() {
    return jwt.sign( { _id : this._id },
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXP
        });
}

mongoose.model('User',userSchema);