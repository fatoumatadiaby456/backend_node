const Reponse = require('../models/reponse.model');

exports.getReponses = async (req, res) => {
  try {
    const reponses = await Reponse.find({ question: req.params.questionId })
      .populate('auteur', 'prenom nom')
      .sort({ createdAt: -1 });
    res.json(reponses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createReponse = async (req, res) => {
  try {
    const { contenu } = req.body;
    if (!contenu) return res.status(400).json({ message: 'Le contenu est obligatoire.' });

    const reponse = await Reponse.create({
      contenu,
      auteur: req.userId,
      question: req.params.questionId
    });
    res.status(201).json(reponse);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteReponse = async (req, res) => {
  try {
    await Reponse.findByIdAndDelete(req.params.id);
    res.json({ message: 'Réponse supprimée.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};