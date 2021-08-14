const router = require('express').Router();
const User = require('../models/user');
const {encrypt , decrypt} = require('../utility/crypto');

// Register
router.post("/register", async (req , res) => {
  const {userName, email , password , description , from , city} = req.body;
   try {
    // create new user
    const newUser  = new User({
      userName: userName,
      email: email,
      password: encrypt(password),
      description: description,
      from: from,
      ciyy: city
    })

    // save user and respond
    const user = newUser.save();
    res.status(200).send(user);
  } 
  catch(err) {
    console.log(err);
  }
})

// Login
router.post("/login", async (req , res) => {
  const {email , password} = req.body;

  try {
    const user = await User.findOne({
      email
    });
  
    !user && res.status(404).send("User not found");

    if(decrypt(user.password) !== password) {
      res.status(400).send("Wrong password");
    }
    
    res.status(200).send(user);
  } catch(err) {
     res.status(500).json(err);
  }


})

module.exports = router;