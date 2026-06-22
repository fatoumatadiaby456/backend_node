const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReponses, createReponse, deleteReponse } = require('../controllers/reponse.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', getReponses);
router.post('/', auth, createReponse);
router.delete('/:id', auth, deleteReponse);

module.exports = router;