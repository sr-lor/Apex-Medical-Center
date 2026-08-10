import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "MOCK_KEY",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "MOCK_SECRET",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "apex-medical-center-storage";

/**
 * Uploads a file buffer or Blob to AWS S3 storage.
 * If AWS credentials are not configured, falls back to returning a mock S3 URL or data URI.
 */
export async function uploadToAWS(fileBuffer, fileName, mimeType = "image/jpeg") {
  const isAwsConfigured = Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_S3_BUCKET_NAME
  );

  const cleanFileName = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (!isAwsConfigured) {
    console.log("[AWS S3 Warning] AWS credentials not fully set. Using local/fallback URL mode.");
    return {
      success: true,
      url: `/uploads/${fileName}`,
      key: cleanFileName,
      isMock: true,
      message: "File stored in local fallback mode. Configure .env with AWS_ACCESS_KEY_ID to upload directly to S3.",
    };
  }

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: cleanFileName,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${cleanFileName}`;
    
    return {
      success: true,
      url: publicUrl,
      key: cleanFileName,
      isMock: false,
    };
  } catch (error) {
    console.error("AWS S3 Upload Error:", error);
    throw new Error(`Failed to upload to AWS S3: ${error.message}`);
  }
}

/**
 * Deletes an object from AWS S3 bucket by Key
 */
export async function deleteFromAWS(fileKey) {
  if (!process.env.AWS_ACCESS_KEY_ID) {
    return { success: true, isMock: true };
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });
    await s3Client.send(command);
    return { success: true };
  } catch (error) {
    console.error("AWS S3 Delete Error:", error);
    return { success: false, error: error.message };
  }
}
