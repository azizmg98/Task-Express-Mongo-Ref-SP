const express = require("express");
const upload = require('../../middleware/multer')
const {
  getShops,
  createShop,
  createProduct,
  updateShop,
} = require("./shopControllers");

const router = express.Router();

router.param('shopId', async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error('shop Not Found');
    err.status = 404;
    next(err);
  }
});

router.get("/",  getShops);
router.post("/", upload.single('image'), createShop);
router.put("/", upload.single('image'), updateShop)
router.post("/:shopId/products", upload.single('image'), createProduct)

module.exports = router;
 