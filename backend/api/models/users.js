const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
},
famille: {
    type: String,
    required: true,
    trim: true
},
race: {
    type: String,
    required: true,
    trim: true
},
food: {
    type: String,
    required: true,
    trim: true
},/*
friends: [{
  type: Schema.Types.Mixed
   }],*/

  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  };

  userSchema.methods.validPassword = function(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
    return this.hash === hash;
  };
  userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
      },
      'MY_SECRET'
    ); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

module.exports = mongoose.model('User', userSchema,"pangolin");
