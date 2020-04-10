const mongoose = require('mongoose');
const passport = require('passport');
const Friendship = require('../models/friends');
const User = require("../models/users");


module.exports.register = (req, res) => {
    const user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    user.famille = req.body.famille;
    user.race = req.body.race;
    user.food = req.body.food;
  
    user.setPassword(req.body.password);
  
    user.save(() => {
      const token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    });
  };
  
  module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if (user) {
        const token = user.generateJwt();
        res.status(200);
        res.json({
          token: token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  };


  module.exports.registerAndAdd = (req, res) => {
    console.log("RegisterAndAdd");
    const user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    user.famille = req.body.famille;
    user.race = req.body.race;
    user.food = req.body.food;
  
    user.setPassword(req.body.password);
  console.log("Password set");
    user.save()
    console.log("Adding Friend");
    var bound = new Friendship();
    bound.follower = req.payload.name;
    bound.followed = user.name;
    Friendship.find({ follower: bound.follower, followed: bound.followed }).countDocuments((error, count) => {
      console.log("Count");
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
  