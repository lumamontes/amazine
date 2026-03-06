export interface GalleryImage {
  url: string;
  alt?: string;
}

const R2_BUCKET_URL = 'https://www.pupunhacode.com';
const GALLERY_PREFIX = 'amazine/gallery/';

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || import.meta.env.R2_ACCOUNT_ID;
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || import.meta.env.R2_ACCESS_KEY_ID;
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || import.meta.env.R2_SECRET_ACCESS_KEY;
    const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || import.meta.env.R2_BUCKET_NAME;

    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      console.warn('R2 credentials not configured, returning empty gallery');
      return [];
    }

    const { S3Client, ListObjectsV2Command } = await import('@aws-sdk/client-s3');

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: GALLERY_PREFIX,
      MaxKeys: 1000,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }

    return response.Contents
      .filter(obj => {
        const key = obj.Key || '';
        return key !== GALLERY_PREFIX && /\.(jpg|jpeg|png|webp|gif)$/i.test(key);
      })
      .map(obj => ({
        url: `${R2_BUCKET_URL}/${obj.Key}`,
        alt: 'Foto da feira AMAZINE',
      }))
      .sort((a, b) => a.url.localeCompare(b.url));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}
