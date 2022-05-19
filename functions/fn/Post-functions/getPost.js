const functions = require("firebase-functions");
const db = require("../../services/db");

exports.getPost = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    try {
      const { id } = request.body;
      if (id) {
        const postDoc = await db.getPostById(id);
        if (postDoc.exists) {
          return response.status(200).send(postDoc.data());
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
