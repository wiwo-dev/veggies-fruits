// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allwed");
  }

  const body = JSON.parse(req.body);
  const order = body.order;

  console.log("PRINTING THE ORDER 🎁🎁🎁");
  console.log(order);
  console.log("END OF PRINTING THE ORDER 🎁🎁🎁");

  const itemsForStripe = order.CartItems.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(Number(item.product.price * 100)),
      product_data: {
        name: item.product.name,
        description: item.product.unit,
        images: [`${item.product.mainPhotoUrl}?w=50`],
      },
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: order.id, //order id
      line_items: itemsForStripe,
      success_url: `${req.headers.origin}/cart/thankyou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart/error`,
    });

    //console.log("PRINTING RESPOSE FROM STRIPE");
    //console.log(session);

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
