const express = require('express');
const { creerQuestion, AfficherQuestions} = require('../controllers/question.controller');
const authMiddleware = require('../middleware/user.middleware');

const router = express.Router();

router.post('/', authMiddleware, creerQuestion);
router.get("/", AfficherQuestions);



module.exports = router;