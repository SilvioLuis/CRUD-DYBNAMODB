var AWS = require('aws-sdk');
const keys = require('./keys');

const util = {
  IAM_USER_KEY: keys.iam_user_key,
  IAM_USER_SECRET: keys.iam_user_secret,
  BUCKET_NAME: keys.bucket_name,
  BUCKET_URL: keys.bucket_url,
  uploadToS3: function (file, filename, acl = 'public-read') {
    return new Promise((resolve, reject) => {
      let IAM_USER_KEY = this.IAM_USER_KEY;
      let IAM_USER_SECRET = this.IAM_USER_SECRET;
      let BUCKET_NAME = this.BUCKET_NAME;

      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        endpoint: 'https://s3.amazonaws.com',
        s3ForcePathStyle: true,
      });

      s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: file.data,
          //ACL: acl
        };

        s3bucket.upload(params, function (err, data) {
          if (err) {
            return resolve({ error: true, message: err });
          }
          return resolve({ error: false, message: data });
        });
      });
    });
  },
};

module.exports = util;
