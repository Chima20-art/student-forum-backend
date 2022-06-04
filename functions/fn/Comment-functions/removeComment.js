const functions = require("firebase-functions");
const db = require("../../services/db");

exports.removeComment = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "DELETE") {
    const { id } = request.body;
    if (id) {
      try {
        const res = await db.removeComment(id);
        response.status(200).send(res);
      } catch (error) {
        response.status(500).send(error);
        functions.logger.error("error removing a comment ", error);
      }
    } else {
      response.status(500).send("comment id is not defined");
    }
  } else {
    response.status(501).send("Request method not supported");
  }
});
