import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with publishable key
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
);

// Product pricing
export const PRICING = {
  starter: {
    name: 'Starter',
    price: 29,
    priceId: 'price_1234567890',
    features: [
      '1 Generated Store',
      'Basic Templates',
      'Standard Support',
      'SSL Certificate',
      'Basic Analytics'
    ]
  },
  professional: {
    name: 'Professional',
    price: 99,
    priceId: 'price_0987654321',
    features: [
      '5 Generated Stores',
      'Premium Templates',
      'Priority Support',
      'Custom Domain',
      'Advanced Analytics',
      'SEO Optimization'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    priceId: 'price_1122334455',
    features: [
      'Unlimited Stores',
      'Custom Templates',
      '24/7 Support',
      'White Label Solution',
      'Advanced Integrations',
      'Custom Development'
    ]
  }
};

export interface CheckoutSessionData {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(data: CheckoutSessionData) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}
