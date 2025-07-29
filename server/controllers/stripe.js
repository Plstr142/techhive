const prisma = require("../config/prisma");
const stripe = require("stripe")(
  "sk_test_51RpRHFA9LCJokWWUYnc6ER7c2zMg4lHwqHI0FG71PIEuBquZzQUaRmzK2InWuIR47spqkwjemTvw54On3MchZM7f00j51iJsZ0"
);

exports.payment = async (req, res) => {
  try {
    // Check user
    // req.user.id
    // console.log(req.user.id);
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
    });
    const amountTHB = cart.cartTotal * 100;
    // console.log(cart);
    // return;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
