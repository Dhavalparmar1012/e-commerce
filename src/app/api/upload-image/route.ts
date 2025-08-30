import { NextRequest, NextResponse } from 'next/server';
import imagekit from '@/lib/imagekit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, fileName } = body;

    if (!file || !fileName) {
      return NextResponse.json({ error: 'Missing file or fileName' }, { status: 400 });
    }

    const result = await imagekit.upload({
      file, // base64 image
      fileName,
      folder: 'saree-catalog',
    });

    return NextResponse.json({ success: true, url: result.url, message: 'Upload Image Successfully' }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
