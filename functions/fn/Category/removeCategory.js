const functions = require("firebase-functions");
const db = require("../../services/db");

exports.removeCategory = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == "DELETE") {
      const { id } = request.body
      if (id) {
        try {
          const res = await db.removeCategory(id);
          return response.status(200).send(res);
        } catch (error) {
          functions.logger.error("Post id is not defined", error);
          return response.status(500).send(error);
        }
      }
    } else {
      return response.status(501).send("Request method is not defined");
    }
  }
);
