const Product = require('../../models/Product');
const Shop = require('../../models/Shop')

exports.getShops = async (req, res) => {
    try {
      // products refrences products inside the schema ... i think
        const shops = await Shop.find().populate('products')
        return res.json(shops)
    } catch (error) {
     return res.status(500).json({ message : error.message })   
    }
};

exports.createShop = async (req, res, next) => {
    try {
        if (req.file) {
          req.body.image = `/${req.file.path}`
          req.body.image = req.body.image.replace('\\', '/');
        }
        const newShop = await Shop.create(req.body)
        return res.status(201).json(newShop)
    } catch (error) {
         next(error)
    }
}

// what if i wanted to create a product without adding it to a shop
exports.createProduct = async (req, res, next ) => {
    try {
        if (req.file) {
            req.body.image = `/${req.file.path}`;
            req.body.image = req.body.image.replace('\\', '/');
          }
          // take shopId from url params. can be called -> const shopId = req.params.shopId
          const { shopId } = req.params 
          // adding id from params to product body
          req.body.shop = shopId 
          const newProduct = await Product.create(req.body);
          // push new product to shop
          await Shop.findByIdAndUpdate(shopId, {
            $push: {products: newProduct._id}
          })
      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  };
