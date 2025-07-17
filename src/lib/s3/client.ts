import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  requestChecksumCalculation: "WHEN_REQUIRED",
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
