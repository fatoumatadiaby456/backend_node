const Commentaire = require('../models/commentaire.model');

exports.getCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({ reponse: req.params.reponseId })
      .populate('auteur', 'prenom nom')
      .sort({ createdAt: 1 });
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createCommentaire = async (req, res) => {
  try {
    const { contenu } = req.body;
    if (!contenu) return res.status(400).json({ message: 'Le contenu est obligatoire.' });

    const commentaire = await Commentaire.create({
      contenu,
      auteur: req.userId,
      reponse: req.params.reponseId
    });
    res.status(201).json(commentaire);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteCommentaire = async (req, res) => {
  try {
    await Commentaire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commentaire supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};