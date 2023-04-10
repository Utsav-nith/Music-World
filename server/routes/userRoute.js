const express= require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const User =require('../models/userModel');
const jwt=require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      req.body.password = hashedPassword;
      const user = new User(req.body);
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(200)
          .send({ message: "User already exists", success: false });
      } else {
        await user.save();
        return res
          .status(200)
          .send({ message: "User registered successfully", success: true });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message, success: false });
    }
  });

  router.post('/login',async(req,res)=>{
    try{
        //find user
        const user = await User.findOne({ email: req.body.email });
        //if not present print user doesnt exist.
        if (!user) {
          return res
            .status(200)
            .send({ message: "User does not exist", success: false });
        }
        //if present then we have to compare the typed password and hashed password using below code
        const passwordsMatched = await bcrypt.compareSync(
            req.body.password,
            user.password
          );//1st is normal password and 2nd is encrypted or password that has been sent time of registration
          if(passwordsMatched){//if passwords are matched then we are generating the token by encrypting the token id and we are sending the encrypted token which has userid to the frontend
            //jwt authentication
            const token =jwt.sign({userId:user._id},process.env.SECRET_KEY,{
                expiresIn:"1d",
            });//sign takes 3 argument content which you want to store as the token,2nd parameter secret key we are using to encrypting the userdata,how much time it will active then after you have to again login
          
          return res.status(200).send({
            message: "User logged in successfully",
            success: true,
            data: token,
          });
        }
          else {
            return res
              .status(200)
              .send({ message: "Password is incorrect", success: false });
          }
    }
    catch(error){
        return res.status(500).send({ message: error.message, success: false });

    }
  })

  router.post("/get-user-data",  authMiddleware,async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      user.password = undefined;//as we dont want to display the password
      return res.status(200).send({
        message: "User data fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message, success: false });
    }
  });
  
  module.exports = router;