const functions = require("firebase-functions");
const { category } = require("../../model/category");
const db = require("../../services/db");
const Category = require("../../model/category").category;

exports.createCategory = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      const { name, description } = request.body;
      if (name && description) {
        try {
          const category = new Category(name, description);
          const res = await db.addCategoryToDb(category);
          return response.status(200).send(category);
        } catch (error) {
          functions.logger.error("Post id is not defined", error);
          return response.status(500).send(error);
        }
      } else {
        return response
          .status(500)
          .send("Can't create a category without a name");
      }
    } else {
      return response.status(501).send("Request method is not supported");
    }
  }
);
