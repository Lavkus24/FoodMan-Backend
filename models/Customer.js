const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
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
  Cart: {
    items: [
      {
        dishName: {
          type: String,
          required: true,
        },
        url: {
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
        restaurent: {
          type: Schema.Types.ObjectId,
          ref: "Restaurent",
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Customer", customerSchema);
