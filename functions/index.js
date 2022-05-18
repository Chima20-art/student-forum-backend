const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.createComment =
  require("./fn/Comment-functions/createComment").createComment;
exports.removeComment =
  require("./fn/Comment-functions/removeComment").removeComment;
exports.addCommentLike =
  require("./fn/Comment-functions/addCommentLike").addCommentLike;

exports.createPost = require("./fn/Post-functions/createPost").createPost;

exports.removePost = require("./fn/Post-functions/removePost").removePost;

exports.addPostLike = require("./fn/Post-functions/addPostLike").addPostLike;
exports.createCategory = require("./fn/Category/createCategory").createCategory;
exports.removeCategory = require("./fn/Category/removeCategory").removeCategory;
