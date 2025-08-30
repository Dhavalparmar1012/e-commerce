import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/db';
import User from '@/models/User.model';

export const GET = async (req: Request) => {
  await connectMongoDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  try {
    const query = search
      ? { name: { $regex: search, $options: 'i' } } // case-insensitive search
      : {};

    const users = await User.find(query);

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
};
