import Ember from 'ember';

export default Ember.Controller.extend({

  stripe: Ember.inject.service(),

  doSomething: Ember.on('init', function() {
    let stripe = this.get('stripe');

    stripe.card.createToken();
  })

});
