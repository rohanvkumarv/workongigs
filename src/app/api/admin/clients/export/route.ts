// app/api/admin/clients/export/route.ts
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import { db } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all clients for export
    // We limit the included data to only what's needed for the export
    const clients = await db.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        modeOfPay: true,
        createdAt: true,
        updatedAt: true,
        freelancerId: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error exporting clients:', error);
    return NextResponse.json(
      { error: 'Failed to export clients' },
      { status: 500 }
    );
  }
}