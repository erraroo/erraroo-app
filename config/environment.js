/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'erraroo',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    apiHost: 'http://localhost:3000',
    defaultPollIntervalSeconds: 30,

    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:3000 https://api.erraroo.com",
      'img-src': "'self' www.gravatar.com",
      'style-src': "'self' 'unsafe-inline'",
    },

    'simple-auth': {
      authorizer: 'authorizer:application',
      crossOriginWhitelist: [
        'http://localhost:3000',
        'https://api.erraroo.com',
      ]
    },

    APP: {

    },
  };

  if (environment === 'development') {
    ENV.defaultPollIntervalSeconds = 5;

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.ErrarooENV = {
      debug: true,
      token: 'Wo4IPFcR508_aTwcz0Hd0w',
      endpoint: 'https://localhost:3000/api/v1/events',
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://api.erraroo.com';
    ENV.favicon = 'https://d16vxe267myqks.cloudfront.net/favicon.ico';
    ENV.ErrarooENV = {
      token: 'TDyMQo0yvN3wVoH2EZybJg',
      endpoint: 'https://api.erraroo.com/api/v1/events',
    };
  }

  return ENV;
};
