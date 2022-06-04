const functions = require("firebase-functions");
const db = require("../../services/db");
const { Comment } = require("../../model/comment");
exports.createComment = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "POST") {
    const { postedBy, content } = request.body;

    if (postedBy && content) {
      try {
        const comment = new Comment(postedBy, content);
        const res = await db.addCommentToDb(comment);
        response.status(200).send(comment);
      } catch (error) {
        response.status(500).send(error);
        functions.logger.error("error creating a comment ", error);
      }
    } else {
      response.status(500).send("error creating a comment");
    }
  } else {
    response.status(501).send("Request method not supported");
  }
});
