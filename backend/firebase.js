// firebase.js
const admin = require("firebase-admin");
const path = require("path");

// serviceAccountKey.json harus kamu download dari Firebase Console
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const fcm = admin.messaging();

module.exports = { admin, db, fcm };
