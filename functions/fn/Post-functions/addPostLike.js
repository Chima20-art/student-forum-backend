const functions = require("firebase-functions");
const db = require("../../services/db");

exports.addPostLike = functions.https.onRequest(async (request, response) => {
  if (request.method == "POST") {
    const { userId, postId } = request.body;
    if (userId && postId) {
      try {
        const postDoc = await db.getPostById(postId);
        if (postDoc.exists) {
          let post = postDoc.data();
          if (post.likes.includes(userId)) {
            return response.status(500).send("Can't like a post two times");
          }
          post.likes.unshift(userId);
          const res = db.addPostToDb(post);
          return response.status(200).send(res);
        } else {
          return response.status(500).send("Can't find post to like");
        }
      } catch (error) {
        functions.logger.error("error adding a  postLike ", error);
        return response.status(500).send("Error adding a postLike");
      }
    } else {
      return response.status(500).send("Error adding a postLike");
    }
  } else {
    return response.status(501).send("Request method not supported");
  }
});
