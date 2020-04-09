const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');

const jwt = require('express-jwt');

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const express = require('express');
const router = express.Router();

// profile
router.get('/profile', auth, ctrlProfile.profileRead);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/editProfile',auth, ctrlProfile.editProfile);

router.get('/getFriends', auth, ctrlProfile.getFriends);
router.post('/getFriends/:friendId', auth, ctrlProfile.addFriend);

router.get('/myFriends', auth, ctrlProfile.myFriends);
router.post('/myFriends/:friendId', auth, ctrlProfile.deleteFriend);

module.exports = router;
