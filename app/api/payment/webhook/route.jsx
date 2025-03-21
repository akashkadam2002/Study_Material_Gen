import { db } from "@/config/db";
import { USER_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (err) {
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case 'checkout.session.completed':
            const result = await db.update(USER_TABLE).set({
                isMember: true
            }).where(eq(USER_TABLE.email, data.customer_details.email));


            break;
        case 'invoice.paid':
            break;
        case 'invoice.payment_failed':
            await db.update(USER_TABLE).set({
                isMember: false
            }).where(eq(USER_TABLE.email, data.customer_details.email));


            break;
        default:
    }

    return NextResponse.json({ result: 'Success' })
}