const functions = require('firebase-functions');
const db = require('../../services/db');

exports.getPost = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == 'POST') {
    try {
      const { id } = JSON.parse(request.body);
      if (id) {
        const postDoc = await db.getPostById(id);

        if (postDoc.exists) {
          let post = postDoc.data();
          const comments = [];
          const categoryId = post.category;
          let category = await db.getCategory(categoryId);
          const categoryData = category.data();
          const commentsPromises = [];
          for (let i = 0; i < post.comments.length; i++) {
            commentsPromises.push(db.getCommentById(post.comments[i]));
          }
          let commentsRes = await Promise.all(commentsPromises);
          commentsRes.forEach((comment) => {
            if (comment.exists) {
              comments.push(comment.data());
            }
            return null;
          });
          post.comments = comments;
          post.category = categoryData;

          return response.status(200).send(post);
        } else {
          return response.status(500).send('Post does not exist.');
        }
      } else {
        return response.status(501).send("can't get a post by id");
      }
    } catch (error) {
      functions.logger.error("can't get a post", error);
      return response.status(502).send(error);
    }
  } else {
    return response.status(503).send('request method is not defined');
  }
});
