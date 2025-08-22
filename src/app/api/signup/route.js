import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, phone, company, acceptMarketing } = await request.json();
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // TODO: Save user to database
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      acceptMarketing
    };


    
    // TODO: Send verification email
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create account'
    }, { status: 500 });
  }
}