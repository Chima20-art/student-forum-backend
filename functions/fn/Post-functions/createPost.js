
const functions = require("firebase-functions");
const db = require("../../services/db");
const { Post } = require("../../model/post");



exports.createPost = functions.https.onRequest(async (request, response)=>{
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "POST") {
    const { postedBy, content, category } = request.body ;
    if (postedBy && content && category) {
      try {
        const post = new Post(postedBy, content, category);
        const res = await db.addPostToDb(post);
        return response.status(200).send(post)
      } catch (error) {
        functions.logger.error("Error creating a Post did catch", error);
        return response.status(500).send(error);
      }
    } else {
      functions.logger.error("postedBy or content or category  is null");
      return response.status(500).send("Error creating a Post");
    }
  } else {
    functions.logger.error("Request method not supported");

    return response.status(501).send("Request method not supported ");
  }
});
