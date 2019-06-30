const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res)=>{
	res.redirect("/auth/google");
});

//auth logout
router.get("/logout", (req, res)=>{
	//handle with passport
	req.logout();
	res.redirect("/anime");
});

//auth google
router.get("/google", passport.authenticate("google", {
	scope: ["profile"]
}));

//callback call for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res)=>{
	// res.send(req.user);
	res.redirect("/anime");
});

module.exports = router;
