import { NextRequest, NextResponse } from 'next/server';

// DATABASE
import { connectMongoDB } from '@/lib/db';

// MODELS
import Catalog from '@/models/Catalog.model';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  await connectMongoDB();

  try {
    const { id } = context.params;

    const catalog = await Catalog.findById(id);

    if (!catalog) {
      return NextResponse.json({ success: false, error: 'Catalog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, catalog }, { status: 200 });
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch catalog' }, { status: 500 });
  }
};
