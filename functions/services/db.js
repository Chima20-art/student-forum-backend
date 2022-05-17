const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../firebase-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://studentforum-f11ce-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = getFirestore();

const addCommentInDb = async (comment) => {
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

module.exports = {
  addCommentInDb,
  removeComment,
  getCommentById,
};
