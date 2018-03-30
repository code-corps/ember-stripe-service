import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import env from 'dummy/config/environment';
import StripeMock from 'ember-stripe-service/utils/stripe-mock';
import sinon from 'sinon';

module('Integration | Stripe service', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;

    this.stripe = this.owner.factoryFor('service:stripe').create({
      config: {
        mock: true,
        publishableKey: env.stripe.publishableKey
      }
    });
  });

  test('it sets the publishable key', function(assert) {
    var setPublishableKey = sinon.stub(StripeMock, 'setPublishableKey');

    this.stripe.set('didConfigure', false);
    this.stripe.configure();

    assert.ok(setPublishableKey.calledWith(env.stripe.publishableKey));
    setPublishableKey.restore();
  });

  test('card.createToken sets the token and returns a promise', function(assert) {
    let cc = {
      number: 4242424242424242,
      exp_year: 2018,
      exp_month: 10,
      cvc: 123,
      address_zip: 12345
    };

    return this.stripe.card.createToken(cc)
      .then(function(res) {
        assert.ok(res.id, 'correct token set');
      });
  });

  test('bankAccount.createToken sets the token and returns a promise', function(assert) {
    let bankAccount = {
      country: 'US',
      routingNumber: '111000025',
      accountNumber: '000123456789',
    };

    return this.stripe.bankAccount.createToken(bankAccount)
      .then(function(res) {
        assert.ok(res.id, 'correct token set');
      });
  });

  test('piiData.createToken sets the token and returns a promise', function(assert) {
    let piiData = {
      personalIdNumber: '123456789'
    };

    return this.stripe.piiData.createToken(piiData)
      .then(function(res) {
        assert.ok(res.id, 'correct token set');
      });
  });
});
