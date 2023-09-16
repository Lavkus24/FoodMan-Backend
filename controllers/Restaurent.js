const User = require("../models/Restaurent");
const Customer = require("../models/Customer");

exports.getHotels = (req, res, next) => {
  //   const options = {
  //     location: {
  //       $geoWithin: { $centerSphere: [[83.5816047, 25.6831213], 1000] },
  //     },
  //   };
  User.find()
    .populate("dishes")
    .then((user) => {
      res
        .status(200)
        .json({ message: "Fetched Hotels successfully.", hotels: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCart = (req, res, next) => {
  const userId = req.userId;
  Customer.findById(userId)
    .populate("Cart.items")
    .then((customer) => {
      res
        .status(200)
        .json({ message: "Fetched Cart successfully.", cart: customer.Cart });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postCart = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const userId = req.userId;
  const items = req.body.items;
  const totalQuantity = req.body.totalQuantity;
  const totalAmount = req.body.totalAmount;
  Customer.findById(userId)
    .then((customer) => {
      if (!customer) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      customer.Cart.items = items;
      customer.Cart.totalAmount = totalAmount;
      customer.Cart.totalQuantity = totalQuantity;

      return customer.save();
    })
    .then((customer) => {
      res
        .status(200)
        .json({ message: "Updated Cart Successfully", cart: customer.Cart });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};
