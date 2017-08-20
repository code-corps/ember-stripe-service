import Ember from 'ember';
import sinon from 'sinon';
import { module, test } from 'qunit';
import { initialize } from 'dummy/initializers/ember-stripe-service';
import env from 'dummy/config/environment';
import StripeMock from 'ember-stripe-service/utils/stripe-mock';

var container, application;
module('Unit | Initializer | Stripe Service Initializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it logs when LOG_STRIPE_SERVICE is set in env config', function(assert) {
  var info = sinon.stub(Ember.Logger, 'info');
  initialize(container, application);

  assert.ok(info.calledWith('StripeService: initialize'));
  info.restore();
});

test('it uses stripe-mock when runing in FastBoot', function(assert) {
  window.FastBoot = true;

  initialize(container, application);

  assert.equal(window.Stripe, StripeMock);
  delete window.FastBoot;
});

test('it uses stripe-mock when mocking is turned on', function(assert) {
  env.stripe.mock = true;

  initialize(container, application);

  assert.equal(window.Stripe, StripeMock);
});
