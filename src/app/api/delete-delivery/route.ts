import { db } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const { deliveryId } = await req.json();

    // Input validation
    if (!deliveryId) {
      return Response.json({ 
        success: false, 
        error: 'Delivery ID is required' 
      }, { status: 400 });
    }

    // Check if delivery exists
    const existingDelivery = await db.delivery.findUnique({
      where: { id: deliveryId }
    });

    if (!existingDelivery) {
      return Response.json({ 
        success: false, 
        error: 'Delivery not found' 
      }, { status: 404 });
    }

    // Delete related files first
    await db.file.deleteMany({
      where: { deliveryId: deliveryId }
    });

    // Delete related revisions and responses
    await db.revisionResponse.deleteMany({
      where: { 
        revision: { 
          deliveryId: deliveryId 
        } 
      }
    });

    await db.revision.deleteMany({
      where: { deliveryId: deliveryId }
    });

    // Delete the delivery
    await db.delivery.delete({
      where: { id: deliveryId }
    });

    return Response.json({ 
      success: true,
      message: 'Delivery deleted successfully',
      deliveryId: deliveryId
    });

  } catch (error: any) {
    console.error('Delivery deletion error:', error);
    
    // Handle specific database errors
    if (error.code === 'P2025') {
      return Response.json({ 
        success: false, 
        error: 'Delivery not found'
      }, { status: 404 });
    }

    // Generic error response
    return Response.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}