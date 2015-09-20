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

    flashMessageDefaults: {
      timeout: 1000 * 10,
    },

    apiHost: 'http://localhost:3000',
    defaultPollIntervalSeconds: 30,

    contentSecurityPolicy: {
      'connect-src': "'self' http://localhost:3000 https://api.erraroo.com https://dicom-app.s3.amazonaws.com",
      'img-src': "'self' www.gravatar.com",
      'style-src': "'self' 'unsafe-inline' *",
      'script-src': "*",
      'font-src': "*",
    },

    APP: {

    },
  };

  ENV['simple-auth'] = {
    base: {
      store: 'session-store:application',
    },

    authorizer: 'authorizer:application',
    crossOriginWhitelist: [
      'http://localhost:3000',
      'https://api.erraroo.com',
    ],
  };

  if (environment === 'development') {
    ENV.defaultPollIntervalSeconds = 5;

     //ENV.APP.LOG_RESOLVER = true;
     //ENV.APP.LOG_ACTIVE_GENERATION = true;
     //ENV.APP.LOG_TRANSITIONS = true;
     //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     //ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.ErrarooENV = {
      debug: true,
      //token: 'o3IMbJSn5T9RsIDSLALDqQ',
      token: 'ct96X9wDhDLXBZugIvp_fg',
      endpoint: 'http://localhost:3000/api/v1/events',
    };
  }

  if (environment === 'test') {
    ENV.apiHost = '';

    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'] = {
      base: {
        store: 'session-store:ephemeral',
      },
    };
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://api.erraroo.com';
    ENV.favicon = 'https://d1bbicx3ding66.cloudfront.net/favicon.ico';
    ENV.ErrarooENV = {
      token: '97fpJYkCg4GRoNHywk04Fw',
      endpoint: 'https://api.erraroo.com/api/v1/events',
    };
  }

  return ENV;
};
