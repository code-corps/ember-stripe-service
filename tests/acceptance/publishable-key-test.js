import { module, test } from 'qunit';
import config from 'dummy/config/environment';
import startApp from '../helpers/start-app';

module('Acceptance | Publishable Key');

test('it throws an error if config.stripe.publishableKey is not set', function(assert) {
  let originalKey = config.stripe.publishableKey;
  config.stripe.publishableKey = undefined;

  assert.expectAssertion(function() {
    startApp();
  }, /Missing Stripe key/);

  config.stripe.publishableKey = originalKey;
});
