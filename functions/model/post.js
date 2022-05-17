/* eslint-disable require-jsdoc */
const uid = require("uid").uid;

class Post {
  constructor(postedBy, content, category) {
    this.postedBy = postedBy;
    this.content = content;
    this.category = category;
    this.likes = [];
    this.id = uid(32);
    this.createdAt = Date.now();
  }
}
exports.Post = Post;
