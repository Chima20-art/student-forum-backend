const functions = require('firebase-functions');
const db = require('../../services/db');

exports.addPostLike = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == 'POST') {
    const { userId, postId } = JSON.parse(request.body);
    if (userId && postId) {
      try {
        const postDoc = await db.getPostById(postId);
        if (postDoc.exists) {
          let post = postDoc.data();
          if (post.likes.includes(userId)) {
            return response.status(505).send("Can't like a post two times");
          }
          post.likes.unshift(userId);
          const res = db.addPostToDb(post);
          return response.status(200).send('ok');
        } else {
          return response.status(504).send("Can't find post to like");
        }
      } catch (error) {
        functions.logger.error('error adding a postLike');
        return response.status(501).send('Error adding a postLike');
      }
    } else {
      return response.status(502).send('Error adding a postLike');
    }
  } else {
    return response.status(503).send('Request method not supported');
  }
});
