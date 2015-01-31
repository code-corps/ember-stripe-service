
# ember-stripe-service
[![Build Status](https://travis-ci.org/buritica/ember-stripe-service.svg?branch=master)](https://travis-ci.org/buritica/ember-stripe-service)

## Description
`ember-stripe-service` is an easy way to add Stripe.js library to your ember-cli project without having to deal with manually setting the script tag

## Features
- sets stripe.js script in index.html (test, app)
- initializes stripe with publishable key
- injects service in controllers which provides promisified method for `Stripe.createToken`
- provides debugging logs for easy troubleshooting

## Installation

* `npm install --save ember-stripe-service`
* `ember server`
* set `stripe.publishablekey` in `config/environment.js`
* Visit your app at http://localhost:4200, you should now see the stripe.js script has been included
* `Stripe` global is now available in your app

## Configuration

### Stripe Publishable Key
In order to use Stripe you must set your [publishable key](https://dashboard.stripe.com/account/apikeys) in `config/environment.js`.

````javascript
ENV.stripe = {
  publishableKey: 'pk_thisIsATestKey'
};
````

## Creating Stripe Tokens

`ember-stripe-service` provides a promisified version of `Stripe.createToken` which makes it easier to interact with its returns within your Ember controllers.

The method makes createToken operate under Ember run's loop making it easier to create integration tests that operate with Stripe's test mode.

To use it inside of a controller action or method you would:

````javascript

export default Ember.Controller.extend({
  myCreditCardProcessingMethod: function() {

    var customer = this.get('customer');

    // obtain access to the injected service
    var stripeService = this.get('stripeService');

    // if for example you had the cc set in your controller
    var card = this.get('creditCard');

    return stripeService.createToken(card).then(function(response) {
      // you get access to your newly created token here
      customer.set('stripeToken', response.id);
      return customer.save();
    })
    .then(function() {
      // do more stuff here
    })
    .catch(response) {
      // if there was an error retrieving the token you could get it here

      if (response.error.type === 'card_error') {
        // show the error in the form or something
      }
    }
  }
})
````

## Debbuging
By setting `LOG_STRIPE_SERVICE` to true in your application configuration you can enable some debugging messages from the service

````javascript
var ENV = {
  // some vars...
  LOG_STRIPE_SERVICE: true,
  // more config ...
}
````

## Running Tests

* `ember test`
* `ember test --server`


For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Upcoming Features
- I'm thinking of giving access other methods of Stripe, but I'm not sure so if you find one useful please make an issue
- Provide an option to inject mocked Stripe library inspired by ember-cli-custom-form but with deeper mocking and set by config flag not environment so integration tests can still be run with real service if wanted
- PRs welcome and encouraged, and if you're not sure how to implement something we could try to work together
