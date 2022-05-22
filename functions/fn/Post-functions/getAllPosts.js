const functions = require("firebase-functions");
const db = require("../../services/db");

//todo : remove collection and switch it to get all posts with replaceing comments, and category id with thier objects
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    const { collection } = request.body;
    if (collection) {
      try {
        let snapshot = await db.getPostsCollection("posts");
        if (snapshot.size > 0) {
          const items = [];
          snapshot.forEach((item) => {
            items.push(item.data());
          });
          return response.status(200).send(items);
        } else {
          return response.status(500).send("No collection ");
        }
      } catch (error) {
        functions.logger.error("Can't get posts collection", error);
        return response.status(500).send(error);
      }
    } else {
      return response.status(500).send("Can't get collection");
    }
  } else {
    return response.status(501).send("Request method is not defined");
  }
});
