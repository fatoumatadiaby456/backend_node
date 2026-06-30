const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        required:true
    }],
    votes_positifs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    votes_negatifs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    vues: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);