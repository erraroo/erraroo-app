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
      'connect-src': "'self' http://localhost:3000",
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
    ENV.erraroo = {
      debug: true,
      token: 'Wo4IPFcR508_aTwcz0Hd0w',
      endpoint: 'http://localhost:3000',
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

    ENV.erraroo = {
      token: 'Wo4IPFcR508_aTwcz0Hd0w',
      endpoint: 'http://localhost:3000',
    };
  }

  if (environment === 'production') {
    ENV.erraroo = {
      token: 'VDJAKW5GlRPFeaKsg5MavQ',
      endpoint: 'https://api.erraroo.com',
    };

    ENV.apiHost = 'https://api.erraroo.com';
    ENV.favicon = 'https://d16vxe267myqks.cloudfront.net/favicon.ico';
  }

  return ENV;
};
