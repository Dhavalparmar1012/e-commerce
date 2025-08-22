import { connectMongoDB } from '@/lib/db';
import User from '@/models/User.model';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password }: RegisterRequestBody = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: true, error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: 'User registered successfully', data: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ success: false, error: 'Error registering user' }, { status: 500 });
  }
}
