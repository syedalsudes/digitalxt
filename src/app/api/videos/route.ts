import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Ensure Cloudinary is configured inside the handler
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || 'Digitalixstudio/testimonials';

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    console.error('Cloudinary Environment Variables Missing!');
    return NextResponse.json(
      { error: 'Cloudinary Cloud Name is missing in .env.local' },
      { status: 500 }
    );
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:"${folder}" AND resource_type:video`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    return NextResponse.json(result.resources);
  } catch (error: any) {
    console.error('Cloudinary API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}