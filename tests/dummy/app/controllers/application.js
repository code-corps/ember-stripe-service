import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({

  stripe: service(),

  doSomething: on('init', function() {
    let stripe = this.get('stripe');

    stripe.card.createToken();
  })

});
