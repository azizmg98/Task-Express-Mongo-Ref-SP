const express = require("express");

const {
  getShop,
  createShop,
} = require("./shopControllers");

const router = express.Router();

router.get("/",  getShop);
router.post("/", upload.single('image'), createShop);

module.exports = Shopsrouter;
