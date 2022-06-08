const functions = require('firebase-functions');
const db = require('../../services/db');

exports.getPostsByCategory = functions.https.onRequest(
  async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    if (request.method == 'POST') {
      try {
        let { category, cursor } = JSON.parse(request.body);

        if (!cursor) {
          cursor = 0;
        }

        const NUMBER_OF_POSTS = 25;
        //console.log('request ', request);
        console.log('body ');
        console.log('category is ', category);

        if (category) {
          let postsRaw = await db.getPostsByCategory(category);

          if (postsRaw.length > 0) {
            postsRaw = postsRaw.slice(
              cursor * NUMBER_OF_POSTS,
              cursor * NUMBER_OF_POSTS + NUMBER_OF_POSTS
            );
            let posts = [];

            const categoryDoc = await db.getCategory(category);
            const categoryData = categoryDoc.data();

            for (var i = 0; i < postsRaw.length; i++) {
              const post = postsRaw[i];

              post.category = categoryData;

              const commentIds = post.comments;
              const comments = commentIds;
              post.comments = comments;
              posts.push(post);
            }

            return response.status(200).send(posts);
          } else {
            return response.status(200).send([]);
          }
        } else {
          functions.logger.error("Can't find Category");
          return response.status(502).send(request.body);
        }
      } catch (error) {
        functions.logger.error('did catch an error', error);
        console.log('did catch an error', error);
        return response.status(504).send('error');
      }
    } else {
      functions.logger.error('Request method is not defined.');
      return response.status(503).send('Request method is not defined.');
    }
  }
);
