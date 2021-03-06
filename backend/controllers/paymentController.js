const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe API Key => /api/v1/stripeapi

exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

// Send Paypal Client ID => /api/v1/paypalid

exports.sendPaypalId = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    paypalClientIdSandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX || "sb",
    paypalClientId: process.env.PAYPAL_CLIENT_ID || "live",
  });
});
