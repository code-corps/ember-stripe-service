const lambda = function () {};
const promiseTokenLambda = function  () {
  return Ember.RSVP.Promise.resolve({ id: true });
};

export default {
  setPublishableKey: lambda,
  card: {
    cardType: lambda,
    validateCardNumber: lambda,
    validateCVC: lambda,
    validateExpiry: lambda,
    createToken: promiseTokenLambda
  },
  bankAccount: {
    createToken: promiseTokenLambda
  },
  piiData: {
    createToken: promiseTokenLambda
  }
};
