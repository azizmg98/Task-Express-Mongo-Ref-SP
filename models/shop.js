const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required:true },
    image: { type: String, required:true },
    // how does this work?
    products: [{ type: mongoose.Schema.Types.ObjectId, ref:'Product' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref:'User'}
  },
  { timestamps: true }
);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Shop", ShopSchema);