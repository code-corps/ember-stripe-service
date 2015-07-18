/* global sinon, Stripe */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import QUnit from 'qunit';
import env from 'dummy/config/environment';

moduleFor('service:stripe', '[integration] - StripeService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

var cc = {
  number: 4242424242424242,
  exp_year: 2018,
  exp_month: 10,
  cvc: 123,
  address_zip: 12345
};

test('card.createToken sets the token and returns a promise', function(assert) {
  var service = this.subject();

  Stripe.setPublishableKey(env.stripe.publishableKey);

  Ember.run(function(){
    service.card.createToken(cc)
      .then(function(res) {
        assert.ok(res.id, 'correct token set');
      })
      .catch(function(error) {
        throw error;
      });
    });
});

