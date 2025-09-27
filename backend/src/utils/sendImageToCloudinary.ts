import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import multer from 'multer';
// import { nanoid } from 'nanoid';
import config from '../config';

// Memory storage for serverless compatibility
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// DigitalOcean S3 client setup
const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: config.aws.do_space_endpoint, // e.g., https://nyc3.digitaloceanspaces.com
    credentials: {
        accessKeyId: config.aws.do_space_access_key || '',
        secretAccessKey: config.aws.do_space_secret_key || '',
    },
});

// Upload function
export const uploadToDigitalOceanAWS = async (
    file: Express.Multer.File,
): Promise<{ location: string }> => {
    try {
        const { nanoid } = require('nanoid');

        const key = `${nanoid()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: config.aws.do_space_bucket,
            Key: key,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        });

        await s3Client.send(command);

        const location = `${config.aws.do_space_endpoint}/${config.aws.do_space_bucket}/${key}`;
        return { location };
    } catch (error: any) {
        throw new Error(`Upload failed: ${error.message}`);
    }
};

// Optional delete function
export const deleteFromDigitalOceanAWS = async (
    fileUrl: string,
): Promise<void> => {
    try {
        const key = fileUrl.split(`/${config.aws.do_space_bucket}/`)[1];

        const command = new DeleteObjectCommand({
            Bucket: config.aws.do_space_bucket,
            Key: key,
        });

        await s3Client.send(command);
    } catch (error: any) {
        throw new Error(`Delete failed: ${error.message}`);
    }
};