import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

// use shim for Ember versions prior to 2.5.0
// https://github.com/ember-cli/ember-cli-shims/pull/54
// https://github.com/ember-cli/ember-cli-shims/issues/76
import { assign } from 'ember-platform';

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override
  let attributes = assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
