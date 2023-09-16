const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    dishName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    restaurent: {
      type: Schema.Types.ObjectId,
      ref: "Restaurent",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);
