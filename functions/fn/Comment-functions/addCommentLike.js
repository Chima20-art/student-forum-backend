const functions = require('firebase-functions');
const db = require('../../services/db');

exports.addCommentLike = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == 'POST') {
      const { commentId, userId } = JSON.parse(request.body);
      if (commentId && userId) {
        try {
          const commentDoc = await db.getCommentById(commentId);

          if (commentDoc.exists) {
            let comment = commentDoc.data();
            if (comment.likes.includes(userId)) {
              return response
                .status(500)
                .send("can't like a comment two times");
            } else {
              comment.likes.unshift(userId);
              const res = db.addCommentToDb(comment);
              return response.status(200).send(res);
            }
          } else {
            return response.status(501).send("Comment doesn't exist");
          }
        } catch (error) {
          functions.logger.error('error adding a comment Like ', error);
          return response.status(502).send(error);
        }
      }
    } else {
      return response.status(503).send('Request method not supported');
    }
  }
);
