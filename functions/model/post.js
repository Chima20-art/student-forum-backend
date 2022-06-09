/* eslint-disable require-jsdoc */
const uid = require('uid').uid;

class Post {
  constructor(postedBy, title, content, category) {
    this.postedBy = postedBy;
    this.content = content;
    this.category = category;
    this.title = title;
    this.likes = [];
    this.id = uid(32);
    this.createdAt = Date.now();
    this.comments = [];
  }
}
exports.Post = Post;
