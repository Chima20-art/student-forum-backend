
const functions = require("firebase-functions");
const db = require("../../services/db");
const { Post } = require("../../model/post");



exports.createPost = functions.https.onRequest(async (request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "POST") {
    const { postedBy, content, category } = JSON.parse(request.body) ;
    if (postedBy && content && category) {
      try {
        const post = new Post(postedBy, content, category);
        const res = await db.addPostToDb(post);
        return response.status(200).send(post)
      } catch (error) {
        functions.logger.error("Error creating a Post", error);
        return response.status(500).send(error);
      }
    } else {
      return response.status(500).send("Error creating a Post");
    }
  } else {
    return response.status(501).send("Request method not supported ");
  }
});
