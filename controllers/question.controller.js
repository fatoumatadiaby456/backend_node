const Question = require('../models/question.model');



exports.creerQuestion = async (req, res) => {
    try {
        const { titre, description, tags } = req.body;
      
        const question = await Question.create({
            titre,
            description,
            auteur: req.user.id,
            tags
        });
        res.status(201).json({message:'Quéstion créer avec succés' , question});
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};


exports.AfficherQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate("auteur", "nom email",) 
            .sort({ createdAt: -1 }); 

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};