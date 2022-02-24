const Shop = require('../../models/Shop')

exports.getShop = async (req, res) => {
    try {
        const shops = await Shop.find()
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
        return res.status(201).josn(newShop)
    } catch (error) {
         next(error)
    }
}