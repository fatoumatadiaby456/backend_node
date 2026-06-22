const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  auteur: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);