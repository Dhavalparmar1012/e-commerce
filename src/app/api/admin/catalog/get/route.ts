import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import Catalog from '@/models/Catalog.model';

export const GET = async (req: Request) => {
  await connectMongoDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  try {
    const query = search
      ? { name: { $regex: search, $options: 'i' } } // case-insensitive search
      : {};

    const catalog = await Catalog.find(query);

    // Return the products as JSON response
    return NextResponse.json({ success: true, data: catalog }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch catalog' }, { status: 500 });
  }
};
