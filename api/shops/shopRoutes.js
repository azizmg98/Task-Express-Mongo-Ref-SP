const express = require("express");
const upload = require('../../middleware/multer')

const {
  getShop,
  createShop,
} = require("./shopControllers");

const router = express.Router();

router.get("/",  getShop);
router.post("/", upload.single('image'), createShop);

module.exports = router;
