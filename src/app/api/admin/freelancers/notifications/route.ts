import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    
    // Verify the freelancer exists and is authorized
    if (!freelancerId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get notifications for this freelancer (including "all freelancers" notifications)
    const notifications = await db.notification.findMany({
      where: {
        OR: [
          { freelancerId: freelancerId },
          { freelancerId: null }, // null means sent to all freelancers
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}