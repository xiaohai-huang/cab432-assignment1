// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const OcrClient = tencentcloud.ocr.v20181119.Client;

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_CLOUD_SECRET_ID,
    secretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
  },
  region: "ap-hongkong",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
};

const client = new OcrClient(clientConfig);

async function getStudentNumber(imageBase64) {
  let number;
  const NUMBER_REGEX = /^N\s*([0-9]+?)\s/;
  try {
    const { TextDetections } = await client.GeneralBasicOCR({
      ImageBase64: imageBase64,
    });
    TextDetections.forEach(({ DetectedText }) => {
      if (NUMBER_REGEX.test(DetectedText)) {
        number = NUMBER_REGEX.exec(DetectedText)[1];
      }
    });
  } catch (err) {
    console.log("OCR API error");
    console.log(err);
  }
  console.log({ number });
  return number || -1;
}

module.exports = getStudentNumber;
