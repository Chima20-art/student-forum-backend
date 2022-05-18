/* eslint-disable require-jsdoc */
const uid = require("uid").uid;

class category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.id = uid(32);
    this.createdAt = Date.now();
  }
}

exports.category = category;
