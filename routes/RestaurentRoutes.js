const express = require("express");
const { body } = require("express-validator/check");
const authController = require("../controllers/RestaurentAuth");
const productController = require("../controllers/Product");
const isAuth = require("../middleware/is-auth");
const User = require("../models/Restaurent");
const router = express.Router();

//Auth Routes
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.signup
);
router.post("/login", authController.login);

//Product Routes
router.get("/", isAuth, productController.getProducts);
router.post("/new-product", isAuth, productController.createProduct);
router.get("/edit/:productId", isAuth, productController.getProduct);
router.put("/edit/:productId", isAuth, productController.updatePost);
router.post("/:productId", isAuth, productController.StockHandler);
router.delete("/delete/:productId", isAuth, productController.DeleteProduct);

module.exports = router;
