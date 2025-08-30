import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import User from '@/models/User.model';

export const DELETE = async (req: NextRequest) => {
  await connectMongoDB();
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Get the last segment of the URL

    // Ensure ID is present
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    // Delete the user from the database
    const user = await User.findByIdAndDelete(id);

    // Check if saree was found and deleted
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error while deleting catalog' }, { status: 500 });
  }
};
