const functions = require("firebase-functions");
const db = require("../../services/db");

exports.getPost = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    try {
      const { id } = request.body;
      if (id) {
        const postDoc = await db.getPostById(id);

        if (postDoc.exists) {
          let post = postDoc.data();
          post.comments = post.comments.map(async (commentId) => {
            let commentDoc = await db.getCommentById(commentId);
            if (commentDoc.exists) {
              const comment = commentDoc.data();

              return comment;
            } else {
              return null;
            }
          });
          return response.status(200).send(post);
        } else {
          return response.status(500).send("Post does not exist.");
        }
      } else {
        return response.status(500).send("can't get a post by id");
      }
    } catch (error) {
      functions.logger.error("can't get a post", error);
      return response.status(500).send(error);
    }
  } else {
    return response.status(501).send("request method is not defined");
  }
});
