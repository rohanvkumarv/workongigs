// app/api/get-clients/route.ts
import { db } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const freelancerId = searchParams.get('freelancerId');

    if (!freelancerId) {
      return Response.json({ 
        success: false, 
        error: 'Freelancer ID is required' 
      }, { status: 400 });
    }

    const clients = await db.client.findMany({
      where: {
        freelancerId,
        status: 'ACTIVE'  // Only fetch active clients
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json({ 
      success: true, 
      clients 
    });

  } catch (error: any) {
    console.error('Error fetching clients:', error);
    return Response.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}