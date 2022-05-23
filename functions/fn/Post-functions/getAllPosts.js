const functions = require("firebase-functions");
const db = require("../../services/db");

//todo : remove collection and switch it to get all posts with replacing comments, and category id with their objects
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    try {
      let postsRaw = await db.getPostsCollection();
      if (postsRaw.length > 0) {
        let posts = [];
        for (var i = 0; i < postsRaw.length; i++) {
          const post = postsRaw[i];

          const category = post.category;
          const categoryDoc = await db.getCategory(category);
          const categoryData = categoryDoc.data();
          post.category = categoryData;

          const commentIds = post.comments;
          const comments =
            commentIds.length > 0 ? await db.getCommentByIds(commentIds) : [];
          post.comments = comments;

          posts.push(post);
        }
        return response.status(200).send(posts);
      } else {
        return response.status(200).send([]);
      }
    } catch (error) {
      functions.logger.error("Can't get posts collection", error);
      return response.status(500).send(error);
    }
  } else {
    return response.status(501).send("Request method is not defined");
  }
});
