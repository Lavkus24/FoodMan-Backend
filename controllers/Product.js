// const fs = require('fs');
// const path = require('path');

// const { validationResult } = require('express-validator/check');

const Product = require("../models/Product");
const User = require("../models/Restaurent");

exports.getProducts = (req, res, next) => {
  const userid = req.userId;

  User.findById(userid).populate("dishes")
    .then((user) => {
      // console.log(user.posts);
      res
        .status(200)
        .json({ message: "Fetched products successfully.", products: user.dishes });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.StockHandler = (req, res, next) => {
  const productId = req.params.productId;
  // console.log("execute");
  const status = req.body.status;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      product.status = status;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", product: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createProduct = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  // if (!req.file) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const dishName = req.body.dishName;
  const description = req.body.description;
  const url =
    "https://i.picsum.photos/id/900/200/200.jpg?hmac=ZrAJ9H_K0TLi9qA-7h0aKGGzI3tLtlu1lx6ntCljBfc";
  const discount = req.body.discount;
  const price = req.body.price;
  const status = true;
  const type = req.body.type;
  const userId = req.userId;
  const product = new Product({
    dishName: dishName,
    description: description,
    url: url,
    discount: discount,
    price: price,
    status: status,
    type: type,
    restaurent: userId,
  });
  product
    .save()
    .then((prod) => {
      return User.findById(userId);
    })
    .then((user) => {

      user.dishes.push(product);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Product created successfully!",
        product: product,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // console.log(productId);
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Product fetched.", product: product });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.DeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId;

  Product.findByIdAndRemove(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
    })
    .then((result) => {
      return User.findById(userId);
    })
    .then((user) => {
      user.dishes.pull(productId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product Deleted." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const productId = req.params.productId;
  // console.log(req.body);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed, entered data is incorrect.");
  //   error.statusCode = 422;
  //   throw error;
  // }
  const dishName = req.body.dishName;
  const description = req.body.description;
  const url =
    "https://i.picsum.photos/id/900/200/200.jpg?hmac=ZrAJ9H_K0TLi9qA-7h0aKGGzI3tLtlu1lx6ntCljBfc";
  const discount = req.body.disprice;
  const price = req.body.price;
  const status = req.body.status;
  const type = req.body.type;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
        product.dishName = dishName,
        product.description = description,
        product.discount = discount,
        product.price = price,
        product.status = status;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", product: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// const clearImage = (filePath) => {
//   filePath = path.join(__dirname, "..", filePath);
//   fs.unlink(filePath, (err) => console.log(err));
// };
