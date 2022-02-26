const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');

// create new instance of class mongoose.Schema
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: {
      type: Number,
      default: 5,
      min: 1,
    },
    image: { type: String },
    quantity: { type: Number, min:0 },
    shop: { type: mongoose.Schema.Types.ObjectId, ref:'Shop' },
  },

  { timestamps: true }
);

// create slug for name
ProductSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

// export model to manipulate in controllers 
module.exports = mongoose.model('Product', ProductSchema);
