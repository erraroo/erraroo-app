/* jshint node: true */

module.exports = {
  production: {
    store: {
      type: 'S3',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'app.erraroo.com',
      acl: 'public-read', //optional, e.g. 'public-read', if ACL is not configured, it is not sent
      //hostName: "my-index-bucket.s3-my-region.amazonaws.com", // To be set with 'direct' indexMode
      indexMode: "indirect", // Optional: 'direct' or 'indirect', 'direct' is used by default.
      //prefix: "app-one/" // Optional: Allows a folder setup within the bucket, so that multiple apps can be stored in one bucket (or maybe things like A/B testing grouped together). Use with 'indirect' indexMode only.
    },

    assets: {
      type: 's3',
      gzip: true,
      gzipExtensions: ['js', 'css', 'svg'],
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'assets.erraroo.com'
    }
  }
};
