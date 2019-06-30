const express = require("express");
const router  = express.Router();
const Series = require("../models/series");
const Chat = require("../models/chats");
const middleware = require("../middleware/index");

//NEW CHAT - form to write the comment
router.get("/anime/:id/chats/new", middleware.isLoggedIn, (req, res)=>{
	Series.findById(req.params.id).populate("chats").exec((err, foundAnime)=>{
		if(err){
			console.log(err);
		}
		else{
			var len = foundAnime.chats.length;
			res.render("chats/new", {anime: foundAnime, user: req.user, lastChat: foundAnime.chats[len - 1]});
		}
	});
});

//CREATE CHAT
router.post("/anime/:id/chats", middleware.isLoggedIn, (req, res)=>{
	Series.findById(req.params.id, (err, foundAnime)=>{
		if(err){
			console.log(err);
		}
		else{
			Chat.create(req.body.chat, (err, chat)=>{
				chat.author.id = req.user._id;
				chat.author.username = req.user.username;
				chat.save();

				foundAnime.chats.push(chat);
				foundAnime.save();
				res.redirect("/anime/" + req.params.id);
			});
		}
	});
});

module.exports = router;
