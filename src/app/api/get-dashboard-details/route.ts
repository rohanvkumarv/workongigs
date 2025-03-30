// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const freelancerId = searchParams.get('freelancerId');
//     const timeFrame = searchParams.get('timeFrame') || '30days';

//     if (!freelancerId) {
//       return NextResponse.json({ error: 'Freelancer ID is required' }, { status: 400 });
//     }

//     // Calculate date ranges based on timeFrame
//     const now = new Date();
//     let startDate = new Date();

//     switch (timeFrame) {
//       case '24h':
//         startDate.setHours(startDate.getHours() - 24);
//         break;
//       case '7days':
//         startDate.setDate(startDate.getDate() - 7);
//         break;
//       case '30days':
//         startDate.setDate(startDate.getDate() - 30);
//         break;
//       case '3months':
//         startDate.setMonth(startDate.getMonth() - 3);
//         break;
//       default:
//         startDate.setDate(startDate.getDate() - 30);
//     }

//     // 1. Fetch freelancer details
//     const freelancer = await db.freelancer.findUnique({
//       where: { id: freelancerId },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         mobile: true,
//         profileImage: true,
//       },
//     });

//     if (!freelancer) {
//       return NextResponse.json({ error: 'Freelancer not found' }, { status: 404 });
//     }

//     // 2. Fetch all deliveries with client info
//     const deliveries = await db.delivery.findMany({
//       where: { client: { freelancerId } },
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
//             createdAt: true,
//           },
//         },
//       },
//       orderBy: { createdAt: 'desc' },
//     });

//     // 3. Calculate financial stats
//     let totalPaidAmount = 0;
//     let amountOnHold = 0;
//     let availableToWithdraw = 0;

//     deliveries.forEach((d) => {
//       if (d.PaymentStatus === 'Paid') {
//         totalPaidAmount += d.cost;
//         if (d.withdrawStatus === 'no') {
//           availableToWithdraw += d.cost;
//         }
//       } else if (d.PaymentStatus === 'Not Paid') {
//         amountOnHold += d.cost;
//       }
//     });

//     // 4. Get unpaid deliveries and clients with unpaid deliveries
//     const clientsWithUnpaidDeliveriesMap = new Map();

//     const unpaidDeliveries = deliveries
//       .filter(d => d.PaymentStatus === 'Not Paid')
//       .map(d => {
//         const clientId = d.client.id;
//         if (!clientsWithUnpaidDeliveriesMap.has(clientId)) {
//           clientsWithUnpaidDeliveriesMap.set(clientId, {
//             id: clientId,
//             name: d.client.name,
//             email: d.client.email,
//             deliveriesCount: 0,
//             totalAmount: 0,
//             deliveryIds: [],
//           });
//         }

//         const client = clientsWithUnpaidDeliveriesMap.get(clientId);
//         client.deliveriesCount += 1;
//         client.totalAmount += d.cost;
//         client.deliveryIds.push(d.id);

//         return {
//           id: d.id,
//           name: d.name,
//           amount: d.cost,
//           createdAt: d.createdAt,
//           client: {
//             id: d.client.id,
//             email: d.client.email,
//             name: d.client.name,
//           },
//         };
//       });

//     const clientsWithUnpaidDeliveries = Array.from(clientsWithUnpaidDeliveriesMap.values());

//     // 5. Get recent deliveries (latest 10)
//     const recentDeliveries = deliveries.slice(0, 10).map(d => ({
//       id: d.id,
//       name: d.name,
//       amount: d.cost,
//       status: d.PaymentStatus,
//       createdAt: d.createdAt,
//       client: {
//         id: d.client.id,
//         name: d.client.name,
//       },
//     }));

//     // 6. Get deliveries within the selected timeframe
//     const deliveriesInTimeFrame = deliveries.filter(
//       d => new Date(d.createdAt) >= startDate && new Date(d.createdAt) <= now
//     );

//     const totalDeliveries = deliveriesInTimeFrame.length;
//     const avgOrderValue =
//       totalDeliveries > 0
//         ? Math.round(deliveriesInTimeFrame.reduce((sum, d) => sum + d.cost, 0) / totalDeliveries)
//         : 0;

//     // 7. Get new clients onboarded in the time frame
//     const newClientsOnboarded = await db.client.count({
//       where: { freelancerId, createdAt: { gte: startDate, lte: now } },
//     });

//     // 8. Get repeated clients count
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//     // Get all clients for the freelancer
//     const clients = await db.client.findMany({
//       where: { freelancerId },
//       select: { id: true, createdAt: true },
//     });

//     // Identify old clients (who joined more than 30 days ago)
//     const oldClients = clients.filter(c => new Date(c.createdAt) < thirtyDaysAgo);

//     // Count deliveries per client in the last 30 days
//     const clientDeliveryCounts = new Map<string, number>();
//     deliveries
//       .filter(d => new Date(d.createdAt) >= thirtyDaysAgo)
//       .forEach(d => {
//         clientDeliveryCounts.set(d.client.id, (clientDeliveryCounts.get(d.client.id) || 0) + 1);
//       });

//     // Count old clients who made at least one delivery in the last 30 days
//     const repeatedClients = oldClients.filter(c => clientDeliveryCounts.has(c.id)).length;

//     // Include new clients who have more than one delivery in 30 days
//     const newClientsWithMultipleDeliveries = clients.filter(
//       c => new Date(c.createdAt) >= thirtyDaysAgo && (clientDeliveryCounts.get(c.id) || 0) > 1
//     ).length;

//     const totalRepeatedClients = repeatedClients + newClientsWithMultipleDeliveries;

//     // 9. Get total clients count
//     const totalClients = await db.client.count({ where: { freelancerId } });

//     // 10. Construct response data
//     const response = {
//       freelancer: {
//         id: freelancer.id,
//         name: freelancer.name,
//         email: freelancer.email,
//         profileImage: freelancer.profileImage,
//         mobile: freelancer.mobile?.toString(),
//       },
//       stats: {
//         totalPaidAmount,
//         amountOnHold,
//         availableToWithdraw,
//         totalClients,
//         activeClientsWithUnpaidDeliveries: clientsWithUnpaidDeliveries.length,
//         totalDeliveries,
//         avgOrderValue,
//         newClientsOnboarded,
//         repeatedClients: totalRepeatedClients,
//       },
//       unpaidDeliveries,
//       recentDeliveries,
//       clientsWithUnpaidDeliveries,
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error('Dashboard API Error:', error);
//     return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
//   }
// }
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

    switch (timeFrame) {
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
        startDate.setDate(startDate.getDate() - 30);
    }

    // 1. Fetch freelancer details
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

    // 2. Fetch all deliveries with client info
    const deliveries = await db.delivery.findMany({
      where: { client: { freelancerId } },
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
      orderBy: { createdAt: 'desc' },
    });

    // 3. Calculate financial stats
    let totalPaidAmount = 0;
    let amountOnHold = 0;
    let availableToWithdraw = 0;

    deliveries.forEach((d) => {
      if (d.PaymentStatus === 'Paid') {
        totalPaidAmount += d.cost;
        if (d.withdrawStatus === 'no') {
          availableToWithdraw += d.cost;
        }
      } else if (d.PaymentStatus === 'Not Paid') {
        amountOnHold += d.cost;
      }
    });

    // 4. Get unpaid deliveries and clients with unpaid deliveries
    const clientsWithUnpaidDeliveriesMap = new Map();

    const unpaidDeliveries = deliveries
      .filter(d => d.PaymentStatus === 'Not Paid')
      .map(d => {
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

        return {
          id: d.id,
          name: d.name,
          amount: d.cost,
          createdAt: d.createdAt,
          client: {
            id: d.client.id,
            email: d.client.email,
            name: d.client.name,
          },
        };
      });

    const clientsWithUnpaidDeliveries = Array.from(clientsWithUnpaidDeliveriesMap.values());

    // 5. Get recent deliveries (latest 10)
    const recentDeliveries = deliveries.slice(0, 10).map(d => ({
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

    // 6. Get deliveries within the selected timeframe
    const deliveriesInTimeFrame = deliveries.filter(
      d => new Date(d.createdAt) >= startDate && new Date(d.createdAt) <= now
    );

    const totalDeliveries = deliveriesInTimeFrame.length;
    const avgOrderValue =
      totalDeliveries > 0
        ? Math.round(deliveriesInTimeFrame.reduce((sum, d) => sum + d.cost, 0) / totalDeliveries)
        : 0;

    // 7. Get new clients onboarded in the time frame
    const newClientsOnboarded = await db.client.count({
      where: { freelancerId, createdAt: { gte: startDate, lte: now } },
    });

    // 8. Get repeated clients count
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get all clients for the freelancer
    const clients = await db.client.findMany({
      where: { freelancerId },
      select: { id: true, createdAt: true },
    });

    // Identify old clients (who joined more than 30 days ago)
    const oldClients = clients.filter(c => new Date(c.createdAt) < thirtyDaysAgo);

    // Count deliveries per client in the last 30 days
    const clientDeliveryCounts = new Map<string, number>();
    deliveries
      .filter(d => new Date(d.createdAt) >= thirtyDaysAgo)
      .forEach(d => {
        clientDeliveryCounts.set(d.client.id, (clientDeliveryCounts.get(d.client.id) || 0) + 1);
      });

    // Count old clients who made at least one delivery in the last 30 days
    const repeatedClients = oldClients.filter(c => clientDeliveryCounts.has(c.id)).length;

    // Include new clients who have more than one delivery in 30 days
    const newClientsWithMultipleDeliveries = clients.filter(
      c => new Date(c.createdAt) >= thirtyDaysAgo && (clientDeliveryCounts.get(c.id) || 0) > 1
    ).length;

    const totalRepeatedClients = repeatedClients + newClientsWithMultipleDeliveries;

    // 9. Get total clients count
    const totalClients = await db.client.count({ where: { freelancerId } });

    // 10. Check for pending withdrawals
    const pendingWithdrawals = await db.withdrawal.count({
      where: {
        freelancerId,
        status: 'pending'
      }
    });

    // 11. Construct response data
    const response = {
      freelancer: {
        id: freelancer.id,
        name: freelancer.name,
        email: freelancer.email,
        profileImage: freelancer.profileImage,
        mobile: freelancer.mobile?.toString(),
      },
      stats: {
        totalPaidAmount,
        amountOnHold,
        availableToWithdraw,
        pendingWithdrawals,
        totalClients,
        activeClientsWithUnpaidDeliveries: clientsWithUnpaidDeliveries.length,
        totalDeliveries,
        avgOrderValue,
        newClientsOnboarded,
        repeatedClients: totalRepeatedClients,
      },
      unpaidDeliveries,
      recentDeliveries,
      clientsWithUnpaidDeliveries,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}