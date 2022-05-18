const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../firebase-account-key.json");
const { Category } = require("../model/category");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://studentforum-f11ce-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = getFirestore();

const addPostToDb = async (post) => {
  return await db
    .collection("posts")
    .doc(post.id)
    .set(JSON.parse(JSON.stringify(post)));
};
const removePost = async (id) => {
  return await db.collection("posts").doc(id).delete();
};
const getPostById = async (id) => {
  return await db.collection("posts").doc(id).get();
};

const addCommentToDb = async (comment) => {
  return await db
    .collection("comments")
    .doc(comment.id)
    .set(JSON.parse(JSON.stringify(comment)));
};

const getCommentById = async (id) => {
  return await db.collection("comments").doc(id).get();
};

const removeComment = async (id) => {
  return await db.collection("comments").doc(id).delete();
};

const addCategoryToDb = async (category) => {
  return await db
    .collection("categories")
    .doc(category.id)
    .set(JSON.parse(JSON.stringify(category)));
};

const removeCategory = async (id) => {
  return await db.collection("categories").doc(id).delete();
};

module.exports = {
  removeCategory,
  addCategoryToDb,
  getPostById,
  removePost,
  removeComment,
  getCommentById,
  addCommentToDb,
  addPostToDb,
};
