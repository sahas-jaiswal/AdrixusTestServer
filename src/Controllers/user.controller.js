const User = require('../Models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require('dotenv');
env.config();


const generateJwtToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (user)
        return res.status(400).json({
          error: "User already registered",
        });
  
      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
      });
  
      _user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",error
          });
        }
  
        if (user) {
          const { _id, firstName, lastName, email } = user;
          return res.status(201).json({ message: "User successfully created.",
            user: { _id, firstName, lastName, email },
          });
        }
      });
    });
  };
  
  exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ message:"User not found",error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword) {
          const token = generateJwtToken(user._id);
          const { _id, firstName, lastName, email } = user;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password!",
          });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    });
  };


exports.getAllUsers = (req, res) => {
    User.find({}).exec((error,user)=>{
        if(error){
            return res.status(400).json({error});
        }
        if(user){
            return res.status(200).json({user});
        }
    })
} 
