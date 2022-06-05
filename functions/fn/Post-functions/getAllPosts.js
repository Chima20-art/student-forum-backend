const functions = require("firebase-functions");
const db = require("../../services/db");


const NUMBER_OF_POSTS_PER_PAGE = 25;

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method == "GET") {
    const {cursor } = JSON.parse(request.body);
    if(!cursor) cursor = 0;
    try {
      let postsRaw = await db.getPostsCollection();
      if (postsRaw.length > 0) {
        postsRaw = postsRaw.slice(cursor*NUMBER_OF_POSTS_PER_PAGE ,cursor*NUMBER_OF_POSTS_PER_PAGE + NUMBER_OF_POSTS_PER_PAGE)
        let posts = [];
        for (var i = 0; i < postsRaw.length; i++) {
          const post = postsRaw[i];

          const category = post.category;
          const categoryDoc = await db.getCategory(category);
          const categoryData = categoryDoc.data();
          post.category = categoryData;

          const commentIds = post.comments;
          const comments =
            commentIds.length > 0 ? await db.getCommentByIds(commentIds) : [];
          post.comments = comments;

          posts.push(post);
        }
        return response.status(200).send(posts);
      } else {
        return response.status(200).send([]);
      }
    } catch (error) {
      functions.logger.error("Can't get posts collection", error);
      return response.status(502).send(error);
    }
  } else {
    return response.status(501).send("Request method is not defined");
  }
});
