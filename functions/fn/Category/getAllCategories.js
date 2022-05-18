const functions = require("firebase-functions");
const db = require("../../services/db");

exports.getAllCategories = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "GET") {
      try {
        const categories = await db.getAllCategories();

        return response.status(200).send(categories);
      } catch (error) {
        functions.logger.error("Can't get a categories", error);
        return response.status(500).send(error);
      }
    } else {
      return response.status(501).send("Request method not defined");
    }
  }
);
