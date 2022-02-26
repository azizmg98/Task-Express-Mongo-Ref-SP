const express = require("express");
const upload = require('../../middleware/multer')

const {
  getShops,
  createShop,
  createProduct
} = require("./shopControllers");

const router = express.Router();

router.get("/",  getShops);
router.post("/", upload.single('image'), createShop);
router.post("/:shopId/products", upload.single('image'), createProduct)

module.exports = router;
 