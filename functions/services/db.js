const admin = require('firebase-admin');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');

const serviceAccount = require('../firebase-account-key.json');
const { Category } = require('../model/category');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://studentforum-f11ce-default-rtdb.europe-west1.firebasedatabase.app/',
});

const db = getFirestore();

const addPostToDb = async (post) => {
  return await db
    .collection('posts')
    .doc(post.id)
    .set(JSON.parse(JSON.stringify(post)));
};
const removePost = async (id) => {
  return await db.collection('posts').doc(id).delete();
};
const getPostById = async (id) => {
  return await db.collection('posts').doc(id).get();
};

const addCommentToDb = async (comment) => {
  return await db
    .collection('comments')
    .doc(comment.id)
    .set(JSON.parse(JSON.stringify(comment)));
};

const getCommentById = async (id) => {
  return await db.collection('comments').doc(id).get();
};

const removeComment = async (id) => {
  return await db.collection('comments').doc(id).delete();
};

const addCategoryToDb = async (category) => {
  return await db
    .collection('categories')
    .doc(category.id)
    .set(JSON.parse(JSON.stringify(category)));
};

const removeCategory = async (id) => {
  return await db.collection('categories').doc(id).delete();
};

const getCategory = async (id) => {
  return await db.collection('categories').doc(id).get();
};
const getAllCategories = async () => {
  const res = await db.collection('categories').get();

  const categories = [];
  res.forEach((doc) => {
    categories.push(doc.data());
  });
  return categories;
};

const getPostsCollection = async () => {
  const postsDoc = await db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(151)
    .get();
  const posts = [];
  postsDoc.forEach((post) => {
    posts.push(post.data());
  });
  return posts;
};

const getPostsByCategory = async (a) => {
  const collectionRef = await db.collection('posts');
  const postsDocs = await collectionRef
    .where('category', '==', a)
    .limit(151)
    .orderBy('createdAt', 'desc')
    .get();

  const posts = [];
  postsDocs.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};

const getCommentByIds = async (ids) => {
  if (!Array.isArray(ids) || ids?.length == 0) return [];
  const commentsDoc = await db
    .collection('comments')
    .where('id', 'in', ids)
    .orderBy('createdAt', 'desc')
    .get();
  const comments = [];
  commentsDoc.forEach((doc) => {
    comments.push(doc.data());
  });
  return comments;
};

const getUsersByIds = async (ids) => {
  if (!Array.isArray(ids) || ids?.length == 0) return [];
  const users = [];
  const usersDoc = await db.collection('users').where('email', 'in', ids).get();
  usersDoc.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
};

const getPostsByUser = async (email) => {
  const postsDoc = await db
    .collection('posts')
    .where('postedBy', '==', email)
    .orderBy('createdAt', 'desc')
    .limit(151)
    .get();
  const posts = [];
  postsDoc.forEach((post) => {
    posts.push(post.data());
  });
  return posts;
};

module.exports = {
  getPostsByUser,
  getUsersByIds,
  getPostsByCategory,
  getPostsCollection,
  getAllCategories,
  getCategory,
  removeCategory,
  addCategoryToDb,
  getPostById,
  removePost,
  removeComment,
  getCommentById,
  addCommentToDb,
  addPostToDb,
  getCommentByIds,
};
