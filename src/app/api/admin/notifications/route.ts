import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET() {
  try {
    const notifications = await db.notification.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        freelancer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Format the notifications
    const formattedNotifications = notifications.map(notification => ({
      ...notification,
      freelancerName: notification.freelancer?.name || null
    }));

    return NextResponse.json({ notifications: formattedNotifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, message, type, freelancerIds } = body;
    
    console.log('Received notification data:', { title, message, type, freelancerIds });

    // Validate input
    if (!title || !message || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // If sending to specific freelancers
    if (freelancerIds && Array.isArray(freelancerIds) && freelancerIds.length > 0) {
      // Create notifications for each freelancer
      const notificationPromises = freelancerIds.map(freelancerId => 
        db.notification.create({
          data: {
            title,
            message,
            type,
            freelancerId
          }
        })
      );

      const createdNotifications = await Promise.all(notificationPromises);
      
      // For response, just return the first notification
      const firstNotification = createdNotifications[0];
      
      // Get freelancer info for the first notification for the response
      const freelancer = await db.freelancer.findUnique({
        where: { id: firstNotification.freelancerId },
        select: { name: true, email: true }
      });
      
      return NextResponse.json({ 
        success: true, 
        notification: {
          ...firstNotification,
          freelancerName: freelancer?.name || null
        },
        count: createdNotifications.length
      }, { status: 201 });
    } 
    // Sending to all freelancers
    else {
      const notification = await db.notification.create({
        data: {
          title,
          message,
          type,
          freelancerId: null // null means sent to all freelancers
        }
      });
      
      return NextResponse.json({ success: true, notification }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}