const express = require("express");
const app = express();
const  bodyParser  = require("body-parser");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const methodOverride = require("method-override");

//mongoose models
const Series = require("./models/series");
const Chat = require("./models/chats");

//cookie session
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,   //1 day in milliseconds
	keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//MongoDB setup
const mongoose = require("mongoose");
mongoose.connect(keys.mongoDB.dbURI, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("connected to DB");
}).catch(err =>{
	console.log("ERROR:", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
        if (process.env.NODE_ENV === "production") {
            const reqType = req.headers["x-forwarded-proto"];
            // if not https redirect to https unless logging in using OAuth
            if (reqType !== "https") {
                req.url.indexOf("auth/google") !== -1
                  ? next()
                  : res.redirect("https://" + req.headers.host + req.url);
            }
        } else {
            next();
        }
    }); 

//requiring routes
const seriesRoutes = require("./routes/series");
const chatsRoutes = require("./routes/chats");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");


app.use((req, res, next)=>{
   res.locals.currentUser = req.user;
	 next();
});

app.use(seriesRoutes);
app.use(chatsRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//Server Start
app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
   console.log("Server Started!");
});
