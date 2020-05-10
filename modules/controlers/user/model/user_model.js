'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({

    email: { type: String, lowercase: true ,default : null, 
  
          unique: true,
        required: [true,'Email is required.']},  //unique: true,
    password: { type: String, default: null, 
     
        required: [true,'password name is required.'] },
    firstName: { type: String, default: null,
      
        required: [false,'First name is required.'] },
    lastName: { type: String, default: null ,
      
        required: [false,'Last name is required.']},
    isDeleted: { type: Boolean, default: false },

    token: { type: String, default: '' },
    activationToken: { type: String, default: '' },
    passwordtoken: {type: String, default: ''},
 
    imageUrl: {type: String, default: 'NoUserImage.jpg'},
    // location: {
	// 	type: {
	// 		type: String,
	// 		default: 'Point'
	// 	},
	// 	coordinates: [Number]
        
	// }
}, {
        timestamps: true
    });


  
    // userSchema.index({ location: '2dsphere' });

    
userSchema.statics.existCheck = function (email, id, callback) {
    var where = {};
    if (id) {
        where = {
            $or: [{ email: new RegExp('^' + email + '$', "i") }], deleted: { $ne: true }, _id: { $ne: id }
        };
    } else {
        where = { $or: [{ email: new RegExp('^' + email + '$', "i") }], deleted: { $ne: true } };
    }
    User.findOne(where, function (err, userdata) {
        if (err) {
            callback(err)
        } else {
            if (userdata) {
                callback(null, 'already exsist');
            } else {
                callback(null, true);
            }
        }
    });
};

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


userSchema.pre('findOneAndUpdate', function (next,temp) {
    var user = this;
    if (!user._update.$set.hasOwnProperty('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user._update.$set.password, salt, function (err, hash) {
            if (err) return next(err);
            user._update.$set.password = hash;
            next();
        });
    });
});
var user = mongoose.model('user', userSchema);
module.exports = user;

