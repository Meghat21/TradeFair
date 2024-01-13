const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: { type: String },
  productCategories: [
    {
      productCategory: { type: String },
    },
  ],
});
module.exports = mongoose.model("category", categorySchema, "category");
