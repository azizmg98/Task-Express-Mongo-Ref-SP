const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String, required:true },
    image: { type: String, required:true },
  },
  { timestamps: true }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Shop", ShopSchema);
