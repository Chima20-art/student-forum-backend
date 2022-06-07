const functions = require("firebase-functions");
const db = require("../../services/db");



exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "POST") {
    let {cursor } = request.body
    if(!cursor) cursor = 0;
    const NUMBER_OF_POSTS = 25;

    try {
      let postsRaw = await db.getPostsCollection();
      if (postsRaw.length > 0) {
        postsRaw = postsRaw.slice(cursor*NUMBER_OF_POSTS ,cursor*NUMBER_OF_POSTS + NUMBER_OF_POSTS)
        let posts = [];
        for (var i = 0; i < postsRaw.length; i++) {
          const post = postsRaw[i];

          const category = post.category;
          const commentIds = post.comments;
         
          let categoryDoc = await db.getCategory(category)

          const categoryData = categoryDoc.data();
          post.category = categoryData;
          post.comments = commentIds;

          posts.push(post);
        }
        return response.status(200).send(posts);
      } else {
        return response.status(200).send([]);
      }
    } catch (error) {
      functions.logger.error("Can't get posts collection", error);
      return response.status(502).send(error);
    }
  } else {
    return response.status(501).send("Request method is not defined");
  }
});
