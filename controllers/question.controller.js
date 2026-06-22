const Question = require('../models/question.model');

// Récupérer toutes les questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une question
const createQuestion = async (req, res) => {
  try {
    const { titre, description, auteur } = req.body;
    const question = await Question.create({ titre, description, auteur });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: "Données invalides" });
  }
};

module.exports = { getQuestions, createQuestion };