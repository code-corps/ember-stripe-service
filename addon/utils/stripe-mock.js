export default {
  setPublishableKey() {},
  card: {
    cardType() {},
    validateCardNumber() {},
    validateCVC() {},
    validateExpiry() {},
    createToken(card, cb) {
      cb('ok', { id: 'mocked' });
    }
  },
  bankAccount: {
    createToken(backAccount, cb) {
      cb('ok', { id: 'mocked' });
    }
  },
  piiData: {
    createToken(piiData, cb) {
      cb('ok', { id: 'mocked' });
    }
  }
};
