const express = require('express');
// add profile picture
const upload = require('../../middleware/multer');
const { signup } = require('./userControllers')

const router = express.Router();

router.post('', signup);

module.exports = router;