
// import { NextResponse } from 'next/server';
// import {db} from '@/lib/prisma';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const freelancerId = searchParams.get('freelancerId');

//     if (!freelancerId) {
//       return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
//     }

//     // 1. Get freelancer basic info
//     const freelancer = await db.freelancer.findUnique({
//       where: { id: freelancerId },
//       select: {
//         name: true,
//         email: true,
//         mobile: true,
//         profileImage:true,
//       },
//     });

//     if (!freelancer) {
//       return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 });
//     }

//     // 2. Get all deliveries with client info
//     const deliveries = await db.delivery.findMany({
//       where: {
//         client: {
//           freelancerId,
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         cost: true,
//         PaymentStatus: true,
//         withdrawStatus: true,
//         createdAt: true,
//         client: {
//           select: {
//             id: true,
//             email: true,
//             name: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     // 3. Calculate various amounts
//     const totalPaidAmount = deliveries
//       .filter(d => d.PaymentStatus === 'Paid')
//       .reduce((sum, d) => sum + d.cost, 0);

//     const amountOnHold = deliveries
//       .filter(d => d.PaymentStatus === 'Not Paid')
//       .reduce((sum, d) => sum + d.cost, 0);

//     const availableToWithdraw = deliveries
//       .filter(d => d.PaymentStatus === 'Paid' && d.withdrawStatus === 'no')
//       .reduce((sum, d) => sum + d.cost, 0);

//     // 4. Get unpaid deliveries with client info
//     const unpaidDeliveries = deliveries
//       .filter(d => d.PaymentStatus === 'Not Paid')
//       .map(d => ({
//         id: d.id,
//         name: d.name,
//         amount: d.cost,
//         createdAt: d.createdAt,
//         client: {
//           id: d.client.id,
//           email: d.client.email,
//           name: d.client.name,
//         },
//       }));

//     // 5. Get clients with unpaid deliveries
//     const clientsWithUnpaidDeliveries = [...new Set(
//       unpaidDeliveries.map(d => d.client.id)
//     )];

//     // 6. Get total clients count
//     const totalClients = await db.client.count({
//       where: { freelancerId },
//     });
//     const response ={

//       freelancer: {
//         id:freelancer.id,
//         name: freelancer.name,
//         email: freelancer.email,
//         profileImage:freelancer.profileImage,
//         mobile: freelancer.mobile?.toString(), // Only convert mobile to string
//       },
      
//       stats: {
//         totalPaidAmount,
//         amountOnHold,
//         availableToWithdraw,
//         totalClients,
//         activeClientsWithUnpaidDeliveries: clientsWithUnpaidDeliveries.length,
//       },
//       unpaidDeliveries: unpaidDeliveries,
//     }
//     console.log(response)
//     return NextResponse.json(response);

//   } catch (error) {
//     console.error('Dashboard API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch dashboard data' },
//       { status: 500 }
//     );
//   }
// }

// app/api/get-dashboard-details/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const freelancerId = searchParams.get('freelancerId');
    const timeFrame = searchParams.get('timeFrame') || '30days';

    if (!freelancerId) {
      return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
    }

    // Calculate date ranges based on timeFrame
    const now = new Date();
    let startDate = new Date();
    
    switch(timeFrame) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7days':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30); // Default to 30 days
    }

    // 1. Get freelancer basic info
    const freelancer = await db.freelancer.findUnique({
      where: { id: freelancerId },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        profileImage: true,
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
            createdAt: true,
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

    // 5. Get recent deliveries (all statuses)
    const recentDeliveries = deliveries
      .slice(0, 10)
      .map(d => ({
        id: d.id,
        name: d.name,
        amount: d.cost,
        status: d.PaymentStatus,
        createdAt: d.createdAt,
        client: {
          id: d.client.id,
          name: d.client.name,
        },
      }));

    // 6. Calculate clients with unpaid deliveries
    const clientsWithUnpaidDeliveriesMap = new Map();
    
    deliveries
      .filter(d => d.PaymentStatus === 'Not Paid')
      .forEach(d => {
        const clientId = d.client.id;
        if (!clientsWithUnpaidDeliveriesMap.has(clientId)) {
          clientsWithUnpaidDeliveriesMap.set(clientId, {
            id: clientId,
            name: d.client.name,
            email: d.client.email,
            deliveriesCount: 0,
            totalAmount: 0,
            deliveryIds: [],
          });
        }
        
        const client = clientsWithUnpaidDeliveriesMap.get(clientId);
        client.deliveriesCount += 1;
        client.totalAmount += d.cost;
        client.deliveryIds.push(d.id);
      });
    
    const clientsWithUnpaidDeliveries = Array.from(clientsWithUnpaidDeliveriesMap.values());

    // 7. Calculate time-frame specific stats
    const deliveriesInTimeFrame = deliveries.filter(d => 
      new Date(d.createdAt) >= startDate && new Date(d.createdAt) <= now
    );

    const totalDeliveries = deliveriesInTimeFrame.length;
    
    const avgOrderValue = totalDeliveries > 0 
      ? Math.round(deliveriesInTimeFrame.reduce((sum, d) => sum + d.cost, 0) / totalDeliveries) 
      : 0;

    // 8. Calculate new clients onboarded in the time frame
    const newClientsOnboarded = await db.client.count({
      where: {
        freelancerId,
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    });

    // 9. Calculate repeated clients (clients who are not new and have made deliveries in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Get all clients
    const clients = await db.client.findMany({
      where: { 
        freelancerId 
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    // Get clients who are not new (created more than 30 days ago)
    const oldClients = clients.filter(c => new Date(c.createdAt) < thirtyDaysAgo);
    
    // Get client IDs who have made deliveries in the last 30 days
    const clientsWithRecentDeliveries = [...new Set(
      deliveries
        .filter(d => new Date(d.createdAt) >= thirtyDaysAgo)
        .map(d => d.client.id)
    )];
    
    // Count how many old clients have recent deliveries
    const repeatedClients = oldClients.filter(c => 
      clientsWithRecentDeliveries.includes(c.id)
    ).length;

    // 10. Get total clients count
    const totalClients = await db.client.count({
      where: { freelancerId },
    });

    const response = {
      freelancer: {
        id: freelancer.id,
        name: freelancer.name,
        email: freelancer.email,
        profileImage: freelancer.profileImage,
        mobile: freelancer.mobile?.toString(), // Convert mobile to string
      },
      stats: {
        totalPaidAmount,
        amountOnHold,
        availableToWithdraw,
        totalClients,
        activeClientsWithUnpaidDeliveries: clientsWithUnpaidDeliveries.length,
        totalDeliveries,
        avgOrderValue,
        newClientsOnboarded,
        repeatedClients,
      },
      unpaidDeliveries,
      recentDeliveries,
      clientsWithUnpaidDeliveries,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}