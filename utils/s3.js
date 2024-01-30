const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const setProfilePhotoExp = require("./setProfilePhotoUrlExpTime");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Send file to S3 bucket
exports.sendFile = async (data, req, imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: data,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
};

// Get signed Url that expires after an hour
exports.getSignedUrl = async (imageName) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, {
    expiresIn: setProfilePhotoExp.s3SignedUrlExp(),
  });

  return url;
};

// Delete file from s3 bucket
exports.deleteFile = async (imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
