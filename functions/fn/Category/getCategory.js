const functions = require("firebase-functions");
const db = require("../../services/db");

exports.getCategory = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    const { id } = request.body;
    if (id) {
      try {
        const res = await db.getCategory(id);
        return response.status(200).send(res);
      } catch (error) {
        functions.logger.error("Can't get a category by id", error);
        return response.status(500).send(error);
      }
    } else {
      return response.status(500).send("Can't get Category");
    }
  } else {
    return response.status(501).send("Request method not defined");
  }
});
