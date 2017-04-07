import { test } from 'ember-qunit';
import StripeMock from 'dummy/services/stripe-mock';

test('card.createToken returns a promise', function(assert) {
  return StripeMock.card.createToken()
    .then((res) => {
      assert.ok(res.id, 'it resolves true');
    });
});

// Bank accounts
test('bankAccount.createToken returns a promise', function(assert) {
  return StripeMock.bankAccount.createToken()
    .then((res) => {
      assert.ok(res.id, 'it resolves true');
    });
});

test('piiData.createToken returns a promise', function(assert) {
  return StripeMock.piiData.createToken()
    .then(function(res) {
      assert.ok(res.id, 'it resolves true');
    });
});
