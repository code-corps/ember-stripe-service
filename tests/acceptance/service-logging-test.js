/* global Stripe */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Ember from 'ember';
import sinon from 'sinon';

module('Acceptance | Logging', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.cc = {
      number: 4242424242424242,
      exp_year: 2018,
      exp_month: 10,
      cvc: 123,
      address_zip: 12345
    };

    this.info = sinon.stub(Ember.Logger, 'info');

    this.createToken = sinon.stub(Stripe.card, 'createToken').callsFake(function(card, cb) {
      let response = {
        id: 'my id'
      };
      cb(200, response);
    });

    this.service = this.owner.lookup('service:stripe');
    this.config = this.owner.lookup('config:stripe');
  });

  hooks.afterEach(function() {
    this.createToken.restore();
    this.info.restore();
  });


  test('createToken logs when debugging is turned on', function(assert) {
    this.config.debug = true;

    return this.service.card.createToken(this.cc).then(() => {
      assert.ok(this.info.called);
    });
  });

  test('createToken doesn\'t log when debug is turned off', function(assert) {
    this.config.debug = false;

    return this.service.card.createToken(this.cc).then(() => {
      assert.ok(this.info.notCalled);
    });
  });
});
