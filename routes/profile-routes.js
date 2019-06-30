const router = require("express").Router();
const User = require("../models/user-model");

const authCheck = (req, res, next)=>{
  if(!req.user){
    //if user is not logged in
    res.redirect("/auth/login");
  }
  else{
    //if user is logged in
    next();
  }
};

router.get("/", authCheck, (req, res)=>{

    console.log(req.user);
  	User.findById(req.user._id).populate("posts").exec((err, foundUser)=>{
    // (req.user).populate("posts").exec((err, foundUser)=>{
        if(err){
          console.log(err);
        }
        else{
          res.render("./profile/profile", {user: foundUser});
        }
    })
});

module.exports = router;
