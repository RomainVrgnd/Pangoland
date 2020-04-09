const mongoose = require('mongoose');

const Schema = mongoose.Schema;

friendSchema = new Schema ({
  
  follower: {
    type: String,
    required: true
  },
  followed: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('Friends', friendSchema,"friendship");
/*
const User = require('./users')
follower: [{
  type: Schema.Types.ObjectId,
  ref: User
}],
followed:[{
  type: Schema.Types.ObjectId,
  ref: User
}],*/