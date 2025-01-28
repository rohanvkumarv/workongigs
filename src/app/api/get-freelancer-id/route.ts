// app/api/get-freelancer-id/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Add await here
  const cookieStore = await cookies();
  const freelancerId = cookieStore.get('freelancerId')?.value;
  
  return NextResponse.json({ freelancerId });
}