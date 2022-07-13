import Stripe from "stripe";
import { buffer } from "micro";
import prisma from "lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//to prevent nextjs from parsing the body
export const config = {
  api: {
    bodyParser: false,
  },
};

const setOrderAsPaid = async (OrderId) => {
  const updatedOrder = await prisma.order.update({
    where: { id: Number(OrderId) },
    data: {
      status: "PAID",
    },
  });
  return updatedOrder;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allwed");
  }

  let event;
  try {
    // 1. retreive the event by verifying the signature using the raw body and secret
    const rawBody = await buffer(req);
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(rawBody.toString(), signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(`✅ Success: `, event.id);

  // 2. Handle event type and business logic
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log("💰 Payment received");
      console.log(session);
      const orderId = session.client_reference_id;
      const updatedOrder = await setOrderAsPaid(orderId);
      console.log("ORDER UPDATED");
      console.log(updatedOrder);

      break;
    // ... handle other event types
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
