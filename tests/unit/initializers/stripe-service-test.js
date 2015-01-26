/* global sinon, Stripe */
import Ember from 'ember';
import { initialize } from 'dummy/initializers/stripe-service';

var container, application;

module('StripeServiceInitializer', {
  setup: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it sets stripe key', function() {
  var setPublishableKey = sinon.stub(Stripe, 'setPublishableKey');
  initialize(container, application);

  ok(setPublishableKey.calledWith('pk_thisIsATestKey'));
  setPublishableKey.restore();
});

// LOG_STRIPE_SERVICE is set to true in dummy app
test('it logs when LOG_STRIPE_SERVICE is set in env config', function() {
  var info = sinon.stub(Ember.Logger, 'info');
  initialize(container, application);

  ok(info.calledWith('StripeService: initialize'));
  info.restore();
});

/**
 * @todo figure out how to change env variables at runtime
 */
QUnit.skip('no logs are generated if LOG_STRIPE_SERVICE is not set');