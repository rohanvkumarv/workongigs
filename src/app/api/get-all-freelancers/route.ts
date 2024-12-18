import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';  // Ensure this path is correct based on your project structure

// GET request handler to fetch all freelancer records
export async function GET(request) {
  try {
    // Fetch all freelancers from the database
    const freelancers = await db.project.findMany();

    // Return the freelancers as a JSON response
    return NextResponse.json(freelancers);
  } catch (error) {
    // Handle any potential errors
    console.error('Error fetching freelancers:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching freelancers' },
      { status: 500 }
    );
  }
}
