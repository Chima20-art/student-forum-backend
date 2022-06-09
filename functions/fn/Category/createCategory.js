const functions = require('firebase-functions');
const { category } = require('../../model/category');
const db = require('../../services/db');
const Category = require('../../model/category').category;

exports.createCategory = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == 'POST') {
      try {
        const { name, description, iconName } = JSON.parse(request.body);
        if (name && description) {
          const category = new Category(name, description, iconName);
          const res = await db.addCategoryToDb(category);
          return response.status(200).send(category);
        } else {
          return response
            .status(502)
            .send("Can't create a category without a name");
        }
      } catch (error) {
        functions.logger.error('Post id is not defined', error);
        return response.status(500).send(error);
      }
    } else {
      return response.status(501).send('Request method is not supported');
    }
  }
);
