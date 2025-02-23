
import { NextResponse } from 'next/server';
import {db} from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');

    if (!freelancerId) {
      return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
    }

    // 1. Get freelancer basic info
    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        name: true,
        email: true,
        mobile: true,
      },
    });

    if (!freelancer) {
      return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 });
    }

    // 2. Get all deliveries with client info
    const deliveries = await db.delivery.findMany({
      where: {
        client: {
          freelancerId,
        },
      },
      select: {
        id: true,
        name: true,
        cost: true,
        PaymentStatus: true,
        withdrawStatus: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 3. Calculate various amounts
    const totalPaidAmount = deliveries
      .filter(d => d.PaymentStatus === 'Paid')
      .reduce((sum, d) => sum + d.cost, 0);

    const amountOnHold = deliveries
      .filter(d => d.PaymentStatus === 'Not Paid')
      .reduce((sum, d) => sum + d.cost, 0);

    const availableToWithdraw = deliveries
      .filter(d => d.PaymentStatus === 'Paid' && d.withdrawStatus === 'no')
      .reduce((sum, d) => sum + d.cost, 0);

    // 4. Get unpaid deliveries with client info
    const unpaidDeliveries = deliveries
      .filter(d => d.PaymentStatus === 'Not Paid')
      .map(d => ({
        id: d.id,
        name: d.name,
        amount: d.cost,
        createdAt: d.createdAt,
        client: {
          id: d.client.id,
          email: d.client.email,
          name: d.client.name,
        },
      }));

    // 5. Get clients with unpaid deliveries
    const clientsWithUnpaidDeliveries = [...new Set(
      unpaidDeliveries.map(d => d.client.id)
    )];

    // 6. Get total clients count
    const totalClients = await db.client.count({
      where: { freelancerId },
    });

    return NextResponse.json({
      freelancer: {
        name: freelancer.name,
        email: freelancer.email,
        mobile: freelancer.mobile,
      },
      stats: {
        totalPaidAmount,
        amountOnHold,
        availableToWithdraw,
        // availableToWithdraw: totalPaidAmount - amountOnHold,
        totalClients,
        activeClientsWithUnpaidDeliveries: clientsWithUnpaidDeliveries.length,
      },
      unpaidDeliveries: unpaidDeliveries,
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}