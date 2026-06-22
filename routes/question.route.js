const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion } = require('../controllers/question.controller');

router.get('/', getQuestions);
router.post('/', createQuestion);

module.exports = router;