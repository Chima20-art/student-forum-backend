/* eslint-disable require-jsdoc */
const uid = require("uid").uid;

class Comment {
  constructor(postedBy, content) {
    this.postedBy = postedBy;
    this.content = content;
    this.likes = [];
    this.id = uid(32);
    this.createdAt = Date.now();
  }
}

exports.Comment = Comment;
