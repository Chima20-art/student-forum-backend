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
          const comments = [];
          const categoryId = post.category;
          let category = await db.getCategory(categoryId);
          const categoryData = category.data();
          for (let i = 0; i < post.comments.length; i++) {
            let commentDoc = await db.getCommentById(post.comments[i]);
            if (commentDoc.exists) {
              const comment = commentDoc.data();
              comments.push(comment);
            }
          }
          post.comments = comments;
          post.category = categoryData;

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
