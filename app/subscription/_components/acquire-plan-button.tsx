"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlan = async () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      {},
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="rounded-full w-full font-bold"
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlan;
