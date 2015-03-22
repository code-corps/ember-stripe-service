/* global sinon, Stripe */
import Ember from 'ember';
import {module, test, skip} from 'qunit';
import QUnit from 'qunit';
import { initialize } from 'dummy/initializers/stripe-service';

var container, application;

module('StripeServiceInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it sets stripe key', function(assert) {
  var setPublishableKey = sinon.stub(Stripe, 'setPublishableKey');
  initialize(container, application);

  assert.ok(setPublishableKey.calledWith('pk_thisIsATestKey'));
  setPublishableKey.restore();
});

// LOG_STRIPE_SERVICE is set to true in dummy app
test('it logs when LOG_STRIPE_SERVICE is set in env config', function(assert) {
  var info = sinon.stub(Ember.Logger, 'info');
  initialize(container, application);

  assert.ok(info.calledWith('StripeService: initialize'));
  info.restore();
});

/**
 * @todo figure out how to change env variables at runtime
 */
QUnit.skip('no logs are generated if LOG_STRIPE_SERVICE is not set');

test('it injects stripe service into controllers', function(assert) {
  var stub = sinon.stub(application, 'inject');

  initialize(container, application);

  assert.ok(stub.calledWith('controller', 'stripeService', 'service:stripe'));
  stub.restore();
});

test('it injects stripe service into controllers', function(assert) {
  var stub = sinon.stub(application, 'inject');

  initialize(container, application);

  assert.ok(stub.calledWith('route', 'stripeService', 'service:stripe'));
  stub.restore();
});