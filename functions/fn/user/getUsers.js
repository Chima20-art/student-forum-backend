const functions = require('firebase-functions');
const db = require('../../services/db');

exports.getUsersByIds = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == 'POST') {
    const { ids } = JSON.parse(request.body);
    if (ids) {
      try {
        const users = await db.getUsersByIds(ids);
        return response.status(200).send(users);
      } catch (error) {
        functions.logger.error("Can't get a user by ids", error);
        return response.status(501).send(error);
      }
    } else {
      return response.status(502).send("Can't get Category");
    }
  } else {
    return response.status(503).send('Request method not defined');
  }
});
