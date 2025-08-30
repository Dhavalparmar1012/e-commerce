import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import Catalog from '@/models/Catalog.model';

export const DELETE = async (req: NextRequest) => {
  await connectMongoDB();
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Get the last segment of the URL

    // Ensure ID is present
    if (!id) {
      return NextResponse.json({ success: false, error: 'Catalog ID is required' }, { status: 400 });
    }

    // Delete the catalog from the database
    const catalog = await Catalog.findByIdAndDelete(id);

    // Check if saree was found and deleted
    if (!catalog) {
      return NextResponse.json({ success: false, error: 'Catalog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Catalog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error while deleting catalog' }, { status: 500 });
  }
};
