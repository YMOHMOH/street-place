const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
  sendPaypalId,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);
router.route("/paypalid").get(isAuthenticatedUser, sendPaypalId);

module.exports = router;
