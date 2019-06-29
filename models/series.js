var mongoose = require("mongoose");

var seriesSchema = new mongoose.Schema({
	name: String,
	gist: String,
	image: String,
	description: String,
	chats: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Chat"
      }
   ],
	 author: {
		 id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
	   },
	   username: String
	 }
});

module.exports = mongoose.model("Series", seriesSchema);
