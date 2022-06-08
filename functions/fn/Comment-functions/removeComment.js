const functions = require('firebase-functions');
const db = require('../../services/db');

exports.removeComment = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  if (request.method == 'POST') {
    const { id } = JSON.parse(request.body);
    if (id) {
      try {
        const res = await db.removeComment(id);
        response.status(200).send('ok');
      } catch (error) {
        response.status(500).send('error');
        functions.logger.error('error removing a comment ', error);
      }
    } else {
      response.status(502).send('comment id is not defined');
    }
  } else {
    response.status(501).send('Request method not supported');
  }
});
