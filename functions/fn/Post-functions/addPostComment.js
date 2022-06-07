const functions = require("firebase-functions");
const db = require("../../services/db");

exports.addPostComment = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == "POST") {
      const { commentId, postId } =request.body
      if (commentId && postId) {
        try {
          const postDoc = await db.getPostById(postId);
          if (postDoc.exists) {
            let post = postDoc.data();
            if (!post.comments.includes(commentId)) {
              post.comments.unshift(commentId);
              const res = await db.addPostToDb(post);
              return response.status(200).send(post);
            } else {
              return response.status(500).send("Duplicated Comment Id");
            }
          } else {
            return response.status(500).send("Post does not exist");
          }
        } catch (error) {
          functions.logger.error("Can't add a Post comment", error);
          return response.status(500).send(error);
        }
      } else {
        return response.status(500).send("Can't add a Post comment");
      }
    } else {
      return response.status(501).send("Request method not supported");
    }
  }
);
