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
          let postedBy = await db.getUsersByIds([post.postedBy]);

          const categoryData = category.data();
          const commentsPromises = [];
          for (let i = 0; i < post.comments.length; i++) {
            commentsPromises.push(db.getCommentById(post.comments[i]));
          }
          let commentsRes = await Promise.all(commentsPromises);
          let commentUsersIds = [];
          commentsRes.forEach((comment) => {
            if (comment.exists) {
              const commentData = comment.data();
              commentUsersIds.push(commentData.postedBy);
              comments.push(commentData);
            }
            return null;
          });

          post.commentUsers = await db.getUsersByIds(commentUsersIds);
          post.comments = comments;
          post.category = categoryData;
          post.postedBy = postedBy?.length > 0 ? postedBy[0] : null;

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
