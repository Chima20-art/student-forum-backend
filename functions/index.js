const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createComment =
  require('./fn/Comment-functions/createComment').createComment;
exports.removeComment =
  require('./fn/Comment-functions/removeComment').removeComment;
exports.addCommentLike =
  require('./fn/Comment-functions/addCommentLike').addCommentLike;

exports.createPost = require('./fn/Post-functions/createPost').createPost;

exports.removePost = require('./fn/Post-functions/removePost').removePost;

exports.addPostLike = require('./fn/Post-functions/addPostLike').addPostLike;
exports.createCategory = require('./fn/Category/createCategory').createCategory;
exports.removeCategory = require('./fn/Category/removeCategory').removeCategory;
exports.getCategory = require('./fn/Category/getCategory').getCategory;
// eslint-disable-next-line max-len
exports.getAllCategories =
  require('./fn/Category/getAllCategories').getAllCategories;

exports.getPost = require('./fn/Post-functions/getPost').getPost;

// eslint-disable-next-line max-len
exports.addPostComment =
  require('./fn/Post-functions/addPostComment').addPostComment;

exports.getAllPosts = require('./fn/Post-functions/getAllPosts').getAllPosts;
exports.getPostsByCategory2 =
  require('./fn/Post-functions/getPostsByCategory').getPostsByCategory;

exports.getUsersByIds = require('./fn/user/getUsers').getUsersByIds;
