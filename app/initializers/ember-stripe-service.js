import Ember from 'ember';
import StripeMock from 'ember-stripe-service/utils/stripe-mock';
import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];
  config.stripe = config.stripe || {};
  config.stripe.debug = config.stripe.debug || config.LOG_STRIPE_SERVICE;

  application.register('config:stripe', config.stripe, { instantiate: false });
  application.inject('service:stripe', 'config', 'config:stripe');

  if (config.stripe.debug) {
    Ember.Logger.info('StripeService: initialize');
  }

  if (!config.stripe.publishableKey) {
    throw new Ember.Error('StripeService: Missing Stripe key, please set `ENV.stripe.publishableKey` in config.environment.js');
  }

  if (typeof FastBoot !== 'undefined' || config.stripe.mock) {
    window.Stripe = StripeMock;
  }
}

export default {
  name: 'ember-stripe-stripe',
  initialize: initialize
};
