const functions = require('firebase-functions');
const db = require('../../services/db');
const { Comment } = require('../../model/comment');

exports.addPostComment = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method == 'POST') {
      try {
        const { postedBy, content, postId } = JSON.parse(request.body);
        if (postedBy && content && postId) {
          const postDoc = await db.getPostById(postId);
          if (postDoc.exists) {
            const comment = new Comment(postedBy, content);
            const commentCraeted = await db.addCommentToDb(comment);
            let post = postDoc.data();
            post.comments.unshift(comment.id);
            const res = await db.addPostToDb(post);
            return response.status(200).send('ok');
          } else {
            return response.status(500).send('Post does not exist');
          }
        } else {
          return response.status(503).send("Can't add a Post comment");
        }
      } catch (error) {
        functions.logger.error("Can't add a Post comment", error);
        return response.status(502).send('error');
      }
    } else {
      return response.status(501).send('Request method not supported');
    }
  }
);
