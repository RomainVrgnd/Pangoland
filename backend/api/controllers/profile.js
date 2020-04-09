const mongoose = require('mongoose');

const Friendship = require('../models/friends');
const User = require("../models/users");

//const Friendship = mongoose.model('Friends');

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id).exec(function (err, user) {
      res.status(200).json(user);
    });
  }
};



module.exports.getFriends = (req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};

module.exports.myFriends = (req, res) => {
  Friendship.find({ follower: req.payload.name }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};



exports.editProfile = async (req, res, next) => {
  try {
    const update = req.body;
    const pangolinId = req.payload._id;
    await User.findByIdAndUpdate(pangolinId, update, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log('Data updated successfully');
        res.status(200).json({
          data: data
        });
      }
    })
  } catch (error) {
    next(error)
  }
};



module.exports.deleteFriend = async (req, res) => {
  if (!req.payload._id) {
    console.log("NON AUTORIZE");
    return res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  }
  if (!req.params.friendId) {
    console.log("Ami non trouvé");
    return res.status(401).json({
      message: 'Friend not found'
    });
  }
  Friendship.findOneAndDelete({ follower: req.payload.name, followed: req.params.friendId })
    .then((data) => {

      res.status(200);
      res.json({
        message: "Friend removed !"
      });

    });
}


module.exports.addFriend = async (req, res) => {
  if (!req.payload._id) {
    console.log("NON AUTORIZE");
    return res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  }
  if (!req.params.friendId) {
    console.log("Ami non trouvé");
    return res.status(401).json({
      message: 'Friend not found'
    });
  }

  var bound = new Friendship();
  bound.follower = req.payload.name;
  bound.followed = req.params.friendId;
  Friendship.find({ follower: bound.follower, followed: bound.followed }).countDocuments((error, count) => {
    if (count > 0) {
      return res.status(401).json({
        message: 'Bound already exist'
      })
    }
    else {
      bound.save(() => {
        return res.status(200).json({
          message: "New friendship Added !"
        });
      })
    }
  })


};

/*
var bound = new Friendship();
await User.find({name: req.payload.name})
.then((data)=>{
  console.log("FIND1");
  bound.follower=data;
 });
 await User.find({name: req.params.friendId})
.then((data)=>{
 console.log("FIND2");
  bound.followed=data;
 })
 .then(()=>{
   bound.save(() => {
     res.status(200);
     res.json({
       message: "New friendship Added !"
     });
   });
 })
 */
