const express = require("express");
const router  = express.Router();
const Series = require("../models/series");
const Chat = require("../models/chats");
const middleware = require("../middleware/index");

router.get("/", (req, res)=>{
	res.redirect("/anime");
});

//homepage
router.get("/anime", (req, res)=>{
	Series.find({}, (err, allAnime)=>{
       if(err){
        console.log(err);
       }
			 else {
			   // console.log(allAnime);
			   res.render("series/home",{animes:allAnime});
       }
    });
});

//NEW SERIES: takes to the form to create another anime series to discuss about
router.get("/anime/new", middleware.isLoggedIn, (req, res)=>{
	res.render("series/new");
});

//CREATE - add new anime to DB
router.post("/anime", middleware.isLoggedIn, (req, res)=>{
    Series.create(req.body.anime , (err, newlyCreated)=>{
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page

						newlyCreated.author.id = req.user._id;
						newlyCreated.author.username = req.user.username;
						newlyCreated.save();

            res.redirect("/anime");
        }
    });
});

//SHOW - show page for a post
router.get("/anime/:id", (req, res)=>{
	Series.findById(req.params.id).populate("chats").exec((err, foundAnime)=>{
		if(err){
			res.redirect("back");
		}
		else{
			res.render("series/show", {anime: foundAnime});
		}
	});
});

//DELETE - delete a post from the database
router.delete("/anime/:id", (req, res)=>{
	Series.findOneAndDelete(req.params.id, (err, foundAnime)=>{
		if(err){
			res.redirect("/anime");
		}
		else{
			res.redirect("/anime");
		}
	});
});


//EDIT - edit a post
router.get("/anime/:id/edit", middleware.checkPostOwnership, (req, res)=>{
  Series.findById(req.params.id, (err, foundAnime)=>{
    res.render("series/edit", {anime: foundAnime});
  });
});

//UPDATE post
router.put("anime/:id", middleware.checkPostOwnership, (req, res)=>{
	res.send("To update the post you have come to me");
});

module.exports = router;
