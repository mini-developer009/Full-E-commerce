import Stripe from 'stripe';
import config from './index';

  
if (!config.stripe_api_secret) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(config?.stripe_api_secret!, {
    apiVersion: '2025-05-28.basil',
});
  
export default stripe;
