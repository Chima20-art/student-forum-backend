const functions = require("firebase-functions");
const db = require("../../services/db");

exports.getPostsByCategory = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == "GET") {
      const { category } = request.body;
      if (category) {
        try {
          let postsRaw = await db.getPostsByCategory(category);

          if (postsRaw.length > 0) {
            let posts = [];

            const categoryDoc = await db.getCategory(category);
            const categoryData = categoryDoc.data();

            for (var i = 0; i < postsRaw.length; i++) {
              const post = postsRaw[i];

              post.category = categoryData;

              const commentIds = post.comments;
              const comments =
                commentIds.length > 0
                  ? await db.getCommentByIds(commentIds)
                  : [];
              post.comments = comments;
              posts.push(post);
            }

            return response.status(200).send(posts);
          } else {
            return response.status(200).send([]);
          }
        } catch (error) {
          functions.logger.error("Can't find Category", error);
          return response.status(500).send(error);
        }
      } else {
        return response.status(501).send("Can't find category");
      }
    } else {
      return response.status(501).send("Request method is not defined.");
    }
  }
);
