// models/CommandModel.js
const { db } = require("../firebase");
const { nanoid } = require("nanoid");

const collection = db.collection("commands");

module.exports = {
  async create(data) {
    const key = data.key || nanoid(8);
    const docRef = collection.doc(key);
    const payload = {
      key,
      name: data.name || "Untitled",
      action: data.action || {},   // tindakan: { type: 'wifi_on' } atau custom JSON
      createdBy: data.createdBy || null,
      createdAt: Date.now()
    };
    await docRef.set(payload);
    return payload;
  },

  async getAll() {
    const snap = await collection.get();
    const out = [];
    snap.forEach(doc => out.push(doc.data()));
    return out;
  },

  async getByKey(key) {
    const doc = await collection.doc(key).get();
    return doc.exists ? doc.data() : null;
  },

  async update(key, data) {
    const ref = collection.doc(key);
    await ref.update(data);
    const doc = await ref.get();
    return doc.data();
  },

  async delete(key) {
    await collection.doc(key).delete();
    return { success: true };
  }
};
