/* global Stripe */
import Ember from 'ember';
import config from '../config/environment';
var debug = config.LOG_STRIPE_SERVICE;

export function initialize(container, application) {
  if (debug) {
    Ember.Logger.info('StripeService: initialize');
  }
  if (!config.stripe.publishableKey) {
    throw new Ember.Error('SripeService: Missing Stripe key, please set `ENV.stripe.publishableKey` in config.environment.js');
  }
  Stripe.setPublishableKey(config.stripe.publishableKey);
  application.inject('controller', 'stripeService', 'service:stripe');
}

export default {
  name: 'stripe-service',
  initialize: initialize
};
