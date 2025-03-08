import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET() {
  try {
    const freelancers = await db.freelancer.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json({ freelancers });
  } catch (error) {
    console.error('Error fetching freelancers:', error);
    return NextResponse.json({ error: 'Failed to fetch freelancers' }, { status: 500 });
  }
}