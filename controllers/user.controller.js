const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.inscription = async (req, res) => {
    try {
        const { prenom, nom, email,  password  } = req.body; 

        if (!prenom || !nom || !email || !password ) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Utilisateur existe déjà.' });
        }

        const hashagePassword = await bcrypt.hash(password , 10); 

        await User.create({
            prenom,
            nom,
            email,
            password : hashagePassword 
        });

        res.status(201).json({ message: 'Inscription réussie !' });

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

exports.connexion = async (req, res) => {
    try {
        const { email, password  } = req.body; // ✅

        if (!email || !password ) {
            return res.status(400).json({ message: 'Email et mot de passe requis.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur introuvable.' });
        }

        const correspond = await bcrypt.compare(password , user.password ); // ✅
        if (!correspond) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                prenom: user.prenom,
                nom: user.nom,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};