import Meteor from "react-native-meteor";
import { RNS3 } from "react-native-aws3";
import moment from "moment";

import { AWS_S3_KEYPREFIX, 
         AWS_S3_BUCKET,
         AWS_S3_REGION,
         AWS_S3_ACCESS_KEY,
         AWS_S3_SECRET_KEY} from 'react-native-dotenv'

const options = {
  keyPrefix: AWS_S3_KEYPREFIX,
  bucket: AWS_S3_BUCKET,
  region: AWS_S3_REGION,
  accessKey: AWS_S3_ACCESS_KEY,
  secretKey: AWS_S3_SECRET_KEY,
  successActionStatus: 201
};

// upload profile pic to S3
export function UploadProfilePic(uri, onComplete) {
  var msString = new Date().getTime().toString();

  if (!uri || !Meteor.userId()) {
    return null;
  }
  // get image file type
  const imageDotIndex = uri.indexOf(".");
  const imageFileType = uri.substring(imageDotIndex, uri.length - 1);
  // set up file for upload
  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: uri,
    name: "profilePic-" + Meteor.userId() + imageFileType,
    type: "image"
  };

  // upload image
  RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");

    // Call the calback passed to the props
    onComplete(response.body.postResponse.location);
    // SetProfilePic(response.body.postResponse.location);
    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
     *   }
     * }
     */
  });
}
