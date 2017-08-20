/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-stripe-service',
  contentFor: function(type, config) {
    var lazyLoad = config && config.stripe && config.stripe.lazyLoad;
    var mock = config && config.stripe && config.stripe.mock;

    if (type === 'body' && !lazyLoad && !mock) {
      return '<script type="text/javascript" src="https://js.stripe.com/v2/"></script>';
    }
  },

  isDevelopingAddon: function() {
    return false;
  }
};
