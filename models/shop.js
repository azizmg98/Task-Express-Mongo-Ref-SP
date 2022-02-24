const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required:true },
    image: { type: String, required:true },
    product: { type: mongoose.Schema.Types.ObjectId, ref:'Product' }
  },
  { timestamps: true }
);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Shop", ShopSchema);