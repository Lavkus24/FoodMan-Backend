const express = require("express");
const { body } = require("express-validator/check");

const authController = require("../controllers/CustomerAuth");
const RestaurentController = require("../controllers/Restaurent");
const isAuth = require("../middleware/is-auth");

const Customer = require("../models/Customer");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Customer.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.signup
);

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/", isAuth, RestaurentController.getHotels);
router.put("/addtocart", isAuth, RestaurentController.postCart);
router.get("/fetchcart", isAuth, RestaurentController.getCart);

module.exports = router;
