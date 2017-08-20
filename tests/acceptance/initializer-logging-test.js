import { module, test } from 'qunit';
import Ember from 'ember';
import sinon from 'sinon';
import config from 'dummy/config/environment';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

module('Acceptance | Initializer logging', {
  beforeEach() {
    this.info = sinon.stub(Ember.Logger, 'info');
    this._original_LOG_STRIPE_SERVICE = config.LOG_STRIPE_SERVICE;
  },
  afterEach() {
    this.info.restore();
    config.LOG_STRIPE_SERVICE = this._original_LOG_STRIPE_SERVICE;
  }
});

test('it logs on app boot when LOG_STRIPE_SERVICE is true', function(assert) {
  config.LOG_STRIPE_SERVICE = true;
  delete config.stripe.debug;

  let application = startApp();

  assert.ok(this.info.called);

  destroyApp(application);
});

test('it doesn\'t log on app boot when LOG_STRIPE_SERVICE is false', function(assert) {
  config.LOG_STRIPE_SERVICE = false;
  delete config.stripe.debug;

  let application = startApp();

  assert.ok(this.info.notCalled);

  destroyApp(application);
});
