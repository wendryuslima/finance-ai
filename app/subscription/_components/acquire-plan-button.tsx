"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlan = () => {
  const { user } = useUser();
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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";
  if (hasPremiumPlan) {
    return (
      <Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL as string}>
        <Button className="rounded-full w-full font-bold" variant="link">
          Gerenciar plano
        </Button>
      </Link>
    );
  }
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
