const promiseTokenLambda = function  () {
  return Ember.RSVP.Promise.resolve({ id: true });
};

export default {
  setPublishableKey: Ember.K,
  card: {
    cardType: Ember.K,
    validateCardNumber: Ember.K,
    validateCVC: Ember.K,
    validateExpiry: Ember.K,
    createToken: promiseTokenLambda
  },
  bankAccount: {
    createToken: promiseTokenLambda
  },
  piiData: {
    createToken: promiseTokenLambda
  }
};