const Series = require("../models/series");
const Chat = require("../models/chats");
const User = require("../models/user-model");

// all the middleware goes here
const middlewareObj = {};

middlewareObj.checkPostOwnership = (req, res, next)=>{
 if(req.isAuthenticated()){
        Series.findById(req.params.id, (err, foundAnime)=>{
           if(err){
               res.redirect("back");
           }  else {
               // does user own the post?
            if(foundAnime.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    }
    else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/login");
}

module.exports = middlewareObj;
