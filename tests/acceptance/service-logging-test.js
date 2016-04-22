/* global Stripe */
import { test } from 'qunit';
import Ember from 'ember';
import sinon from 'sinon';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'dummy/config/environment';

moduleForAcceptance('Acceptance | Logging', {
  beforeEach() {
    this.cc = {
      number: 4242424242424242,
      exp_year: 2018,
      exp_month: 10,
      cvc: 123,
      address_zip: 12345
    };

    this.info = sinon.stub(Ember.Logger, 'info');

    this.createToken = sinon.stub(Stripe.card, 'createToken', function(card, cb) {
      let response = {
        id: 'my id'
      };
      cb(200, response);
    });

    this.service = this.application.__container__.lookup('service:stripe');
    this._original_LOG_STRIPE_SERVICE = config.LOG_STRIPE_SERVICE;
    this._original_stripePublishableKey = config.stripe.publishableKey;
  },

  afterEach() {
    this.createToken.restore();
    this.info.restore();
    config.LOG_STRIPE_SERVICE = this._original_LOG_STRIPE_SERVICE;
    config.stripe.publishableKey = this._original_stripePublishableKey;
  }
});


test('createToken logs when LOG_STRIPE_SERVICE is set in env config', function(assert) {
  config.LOG_STRIPE_SERVICE = true;

  return this.service.card.createToken(this.cc).then(() => {
    assert.ok(this.info.called);
  });
});

test('createToken doesn\'t log when LOG_STRIPE_SERVICE is set to false in env config', function(assert) {
  config.LOG_STRIPE_SERVICE = false;

  return this.service.card.createToken(this.cc).then(() => {
    assert.ok(this.info.notCalled);
  });
});
