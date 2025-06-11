import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  requestChecksumCalculation: "WHEN_REQUIRED",
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA2RP6IMXE4BMLOTUM",
    secretAccessKey: "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",
  },
});
