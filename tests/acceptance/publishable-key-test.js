import Application from '../../app';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import config from 'dummy/config/environment';

module('Acceptance | Publishable Key', function() {
  test('it throws an error if config.stripe.publishableKey is not set', function(assert) {
    let originalKey = config.stripe.publishableKey;
    config.stripe.publishableKey = undefined;

    assert.expectAssertion(function() {
      run(() => {
        Application.create();
      });
    }, /Missing Stripe key/);

    config.stripe.publishableKey = originalKey;
  });
});
