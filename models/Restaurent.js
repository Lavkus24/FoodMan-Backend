const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const GeoSchema = mongoose.Schema({
//   type: {
//     type: String,
//     default: "Point",
//   },
//   coordinates: {
//     type: [Number], //the type is an array of numbers
//     index: "2dsphere",
//   },
// });

const restaurentSchema = new Schema({
  restaurentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  minBill: {
    type: String,
    required: true,
  },
  // location: GeoSchema,

  address: {
    aptName: {
      type: String,
    },
    locality: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

module.exports = mongoose.model("Restaurent", restaurentSchema);
