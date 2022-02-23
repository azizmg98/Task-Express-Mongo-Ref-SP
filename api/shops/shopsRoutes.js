const express = require("express");

const {
  getProducts,
  productCreate,
  productDelete,
  fetchProduct,
} = require("./ShopsControllers");

const router = express.Router();

router.get("/");
router.post("/");
router.delete("/:productId", productDelete);
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
