// app/api/create-delivery/route.ts
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const {
      clientId,
      delivery: {
        name,
        cost,
        currency,
        desc,
        files,
        PaymentStatus
      }
    } = await req.json();

    // Input validation
    if (!clientId || !name || !cost || !files || files.length === 0) {
      return Response.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Create delivery record
    const delivery = await db.delivery.create({
      data: {
        name,
        desc: desc || '',
        cost: parseFloat(cost),
        PaymentStatus: PaymentStatus || 'Not Paid',
        clientId,
      },
    });

    // Create file records
    const fileRecords = await Promise.all(
      files.map(file => 
        db.file.create({
          data: {
            name: file.name,
            url: file.url,
            deliveryId: delivery.id,
          },
        })
      )
    );

    // Return success response with created data
    return Response.json({ 
      success: true, 
      delivery: {
        id: delivery.id,
        name: delivery.name,
        cost: delivery.cost,
        PaymentStatus: delivery.PaymentStatus
      },
      files: fileRecords
    });

  } catch (error: any) {
    console.error('Delivery creation error:', error);
    
    // Generic error response
    return Response.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}