import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  requestChecksumCalculation: "WHEN_REQUIRED",
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA2RP6IMXEWYHSFXFA",
    secretAccessKey: "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",
  },
});
