import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
  bytes: number;
  duration?: number;
}

export async function getVideosFromFolder(folderPath: string): Promise<CloudinaryResource[]> {
  try {
    const response = await cloudinary.search
      .expression(`folder:"${folderPath}" AND resource_type:video`)
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    return response.resources as CloudinaryResource[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}