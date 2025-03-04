import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, null);

// ensure your Strapi instance is correctly set up and your Next.js API routes can communicate with it
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 1000,
			currency: "eur",
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} else {
		res.setHeader("Allow", ['POST', 'GET']);
		res.status(405).end("Method Not Allowed");
	}
}
