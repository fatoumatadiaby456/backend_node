const express = require('express');
const router = express.Router({ mergeParams: true });
const { getCommentaires, createCommentaire, deleteCommentaire } = require('../controllers/commentaire.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', getCommentaires);
router.post('/', auth, createCommentaire);
router.delete('/:id', auth, deleteCommentaire);

module.exports = router;