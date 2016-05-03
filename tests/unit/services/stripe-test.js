/* global Stripe */
import sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:stripe', 'Unit | Services | Stripe service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

let cc = {
  number: 4242424242424242,
  exp_year: 2018,
  exp_month: 10,
  cvc: 123,
  address_zip: 12345
};

let ba = {
  country: 'US',
  routingNumber: '123124112',
  accountNumber: '125677688',
};

test('card.createToken sets the token and returns a promise', function(assert) {
  let service = this.subject();
  let response = {
    id: 'the_token'
  };

  let createToken = sinon.stub(Stripe.card, 'createToken', function(card, cb) {
    assert.equal(card, cc, 'called with sample creditcard');
    cb(200, response);
  });

  return service.card.createToken(cc)
    .then((res) => {
      assert.equal(res.id, 'the_token');
      createToken.restore();
    });
});

test('card.createToken rejects the promise if Stripe errors', function(assert) {
  let service = this.subject();
  let response = {
    error : {
      code: "invalid_number",
      message: "The 'exp_month' parameter should be an integer (instead, is Month).",
      param: "exp_month",
      type: "card_error"
    }
  };

  let createToken = sinon.stub(Stripe.card, 'createToken', function(card, cb) {
    cb(402, response);
  });

  return service.card.createToken(cc)
    .catch((res) => {
      assert.deepEqual(res, response, 'error passed');
      createToken.restore();
    });
});

// Bank accounts
test('bankAccount.createToken sets the token and returns a promise', function(assert) {
  let service = this.subject();
  let response = {
    id: 'the_token'
  };

  let createBankAccountToken = sinon.stub(
    Stripe.bankAccount,
    'createToken',
    (bankAccount, cb) => {
      assert.equal(bankAccount, ba, 'called with sample bankAccount');
      cb(200, response);
    }
  );

  return service.bankAccount.createToken(ba)
    .then((res) => {
      assert.equal(res.id, 'the_token');
      createBankAccountToken.restore();
    });
});

test('bankAccount.createToken rejects the promise if Stripe errors', function(assert) {
  let service = this.subject();
  let response = {
    error : {
      code: "invalid_number",
      message: "The 'exp_month' parameter should be an integer (instead, is Month).",
      param: "exp_month",
      type: "bank_account_errror"
    }
  };

  let createBankAccountToken = sinon.stub(
    Stripe.bankAccount,
    'createToken',
    function(bankAccount, cb) {
      cb(402, response);
    }
  );

  return service.bankAccount.createToken(ba)
    .catch((res) => {
      assert.equal(res, response, 'error passed');
      createBankAccountToken.restore();
    });
});
