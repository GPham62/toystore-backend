const express = require("express");
const router = express.Router();
const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
const jwt = require('jsonwebtoken')
const userController = require('../users/controller')
const config = require('../../../config-local.json')

router.get('/', (req, res) => {
  res.send("Auth success!")
})

router.post('/facebook/token', passport.authenticate('facebook-token', {session: false}), (req, res) => {
  console.log('Req user: ', req.user)
  if (typeof req.user === 'undefined'){
    res.status(401).send('User not authenticated')
  }
  else {
    console.log('Encrypted user with jwt, secret key: ' + config.JWT_SECRET_KEY)
    const token = jwt.sign(req.user.toJSON(), config.JWT_SECRET_KEY)
    console.log(token)
    res.send({token, user: req.user})
  }
})

router.post('/verify', (req, res) => {
  const {token} = req.body
  jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) =>{
    if (err) res.send({err})
    else{
      userController
      .getOneUser(decoded._id)
      .then(user =>{
        res.send({user})
      })
      .catch(err => res.status(500).send({err}))
    } 
  })
})

passport.use(new FacebookTokenStrategy({
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, cb){
  userController
  .getUserByFacebookId(profile.id)
  .then(user => {
    if (!user){
      console.log("No user found. Creating new user...")
      const newUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile._json.picture.data.url,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      }
      userController
      .createUser(newUser)
      .then(newUser => cb(null, newUser))
    }
    else {
      cb(null, user)
    }
  })
  .catch(err => cb(err, null))
}))

module.exports = router;
