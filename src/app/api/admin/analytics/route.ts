// app/api/admin/analytics/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Authorization check
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const timeFrame = searchParams.get('timeFrame') || '30days';
    
    // Calculate date range based on timeFrame
    const now = new Date();
    let startDate = new Date();
    
    switch (timeFrame) {
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Freelancer stats
    const totalFreelancers = await prisma.freelancer.count();
    
    const newFreelancers = await prisma.freelancer.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    });
    
    // Clients stats
    const totalClients = await prisma.client.count();
    
    const newClients = await prisma.client.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    });
    
    const activeClients = await prisma.client.count({
      where: {
        status: 'ACTIVE'
      }
    });
    
    // Delivery stats
    const totalDeliveries = await prisma.delivery.count();
    
    const newDeliveries = await prisma.delivery.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    });
    
    // Payment stats
    const paidDeliveries = await prisma.delivery.findMany({
      where: {
        PaymentStatus: 'Paid',
        createdAt: {
          gte: startDate
        }
      },
      select: {
        cost: true
      }
    });
    
    const totalPaidAmount = paidDeliveries.reduce((sum, delivery) => sum + delivery.cost, 0);
    
    const unpaidDeliveries = await prisma.delivery.findMany({
      where: {
        PaymentStatus: 'Not Paid',
        createdAt: {
          gte: startDate
        }
      },
      select: {
        cost: true
      }
    });
    
    const totalUnpaidAmount = unpaidDeliveries.reduce((sum, delivery) => sum + delivery.cost, 0);
    
    // Calculate average order value
    const avgOrderValue = totalDeliveries > 0 
      ? (totalPaidAmount + totalUnpaidAmount) / totalDeliveries 
      : 0;
    
    // Get daily stats for charts
    const dailyStats = await getDailyStats(startDate);
    
    // Get top freelancers by earnings
    const topFreelancers = await getTopFreelancers(startDate);
    
    // Get most active clients
    const mostActiveClients = await getMostActiveClients(startDate);

    // Payment success rate
    const paymentSuccessRate = totalPaidAmount + totalUnpaidAmount > 0
      ? (totalPaidAmount / (totalPaidAmount + totalUnpaidAmount)) * 100
      : 0;
    
    // Calculate growth rates
    const previousPeriodStats = await getPreviousPeriodStats(startDate, timeFrame);
    
    const freelancerGrowth = previousPeriodStats.totalFreelancers > 0
      ? ((totalFreelancers - previousPeriodStats.totalFreelancers) / previousPeriodStats.totalFreelancers) * 100
      : 100;
    
    const clientGrowth = previousPeriodStats.totalClients > 0
      ? ((totalClients - previousPeriodStats.totalClients) / previousPeriodStats.totalClients) * 100
      : 100;
    
    const revenueGrowth = previousPeriodStats.totalPaidAmount > 0
      ? ((totalPaidAmount - previousPeriodStats.totalPaidAmount) / previousPeriodStats.totalPaidAmount) * 100
      : 100;
    
    const deliveryGrowth = previousPeriodStats.totalDeliveries > 0
      ? ((totalDeliveries - previousPeriodStats.totalDeliveries) / previousPeriodStats.totalDeliveries) * 100
      : 100;

    return NextResponse.json({
      freelancers: {
        total: totalFreelancers,
        new: newFreelancers,
        growth: freelancerGrowth.toFixed(2)
      },
      clients: {
        total: totalClients,
        new: newClients,
        active: activeClients,
        growth: clientGrowth.toFixed(2)
      },
      deliveries: {
        total: totalDeliveries,
        new: newDeliveries,
        growth: deliveryGrowth.toFixed(2)
      },
      payments: {
        totalPaid: totalPaidAmount,
        totalUnpaid: totalUnpaidAmount,
        avgOrderValue: avgOrderValue.toFixed(2),
        successRate: paymentSuccessRate.toFixed(2),
        growth: revenueGrowth.toFixed(2)
      },
      charts: {
        dailyStats
      },
      insights: {
        topFreelancers,
        mostActiveClients
      }
    });
    
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}

async function getDailyStats(startDate) {
  // Create an array of dates from startDate to now
  const dateRange = [];
  const currentDate = new Date();
  let loopDate = new Date(startDate);
  
  while (loopDate <= currentDate) {
    dateRange.push(new Date(loopDate));
    loopDate.setDate(loopDate.getDate() + 1);
  }
  
  // Initialize result array with dates and zero values
  const result = dateRange.map(date => {
    return {
      date: date.toISOString().split('T')[0],
      freelancers: 0,
      clients: 0,
      deliveries: 0,
      revenue: 0
    };
  });
  
  // Get daily freelancer signups
  const freelancerSignups = await prisma.freelancer.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    select: {
      createdAt: true
    }
  });
  
  freelancerSignups.forEach(signup => {
    const dateStr = signup.createdAt.toISOString().split('T')[0];
    const dateIndex = result.findIndex(item => item.date === dateStr);
    if (dateIndex !== -1) {
      result[dateIndex].freelancers += 1;
    }
  });
  
  // Get daily client additions
  const clientAdditions = await prisma.client.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    select: {
      createdAt: true
    }
  });
  
  clientAdditions.forEach(addition => {
    const dateStr = addition.createdAt.toISOString().split('T')[0];
    const dateIndex = result.findIndex(item => item.date === dateStr);
    if (dateIndex !== -1) {
      result[dateIndex].clients += 1;
    }
  });
  
  // Get daily deliveries
  const deliveryCreations = await prisma.delivery.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    select: {
      createdAt: true,
      cost: true,
      PaymentStatus: true
    }
  });
  
  deliveryCreations.forEach(delivery => {
    const dateStr = delivery.createdAt.toISOString().split('T')[0];
    const dateIndex = result.findIndex(item => item.date === dateStr);
    if (dateIndex !== -1) {
      result[dateIndex].deliveries += 1;
      if (delivery.PaymentStatus === 'Paid') {
        result[dateIndex].revenue += delivery.cost;
      }
    }
  });
  
  return result;
}

async function getTopFreelancers(startDate) {
  // Get all freelancers with their clients
  const freelancers = await prisma.freelancer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      clients: {
        select: {
          id: true,
          deliveries: {
            where: {
              createdAt: {
                gte: startDate
              },
              PaymentStatus: 'Paid'
            },
            select: {
              cost: true
            }
          }
        }
      }
    }
  });
  
  // Calculate earnings for each freelancer
  const freelancersWithEarnings = freelancers.map(freelancer => {
    let totalEarnings = 0;
    let totalDeliveries = 0;
    
    freelancer.clients.forEach(client => {
      client.deliveries.forEach(delivery => {
        totalEarnings += delivery.cost;
        totalDeliveries += 1;
      });
    });
    
    return {
      id: freelancer.id,
      name: freelancer.name || freelancer.email.split('@')[0],
      email: freelancer.email,
      earnings: totalEarnings,
      deliveries: totalDeliveries
    };
  });
  
  // Sort by earnings and return top 5
  return freelancersWithEarnings
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 5);
}

async function getMostActiveClients(startDate) {
  // Get all clients with their deliveries
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      deliveries: {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true,
          cost: true,
          PaymentStatus: true
        }
      },
      freelancerId: true
    }
  });
  
  // Calculate stats for each client
  const clientsWithStats = clients.map(client => {
    let totalSpent = 0;
    const deliveriesCount = client.deliveries.length;
    let paidDeliveriesCount = 0;
    
    client.deliveries.forEach(delivery => {
      if (delivery.PaymentStatus === 'Paid') {
        totalSpent += delivery.cost;
        paidDeliveriesCount += 1;
      }
    });
    
    const paymentRate = deliveriesCount > 0 ? (paidDeliveriesCount / deliveriesCount) * 100 : 0;
    
    return {
      id: client.id,
      name: client.name,
      email: client.email || 'N/A',
      deliveriesCount,
      totalSpent,
      paymentRate: paymentRate.toFixed(2),
      freelancerId: client.freelancerId
    };
  });
  
  // Sort by deliveries count and return top 5
  return clientsWithStats
    .sort((a, b) => b.deliveriesCount - a.deliveriesCount)
    .slice(0, 5);
}

async function getPreviousPeriodStats(startDate, timeFrame) {
  // Calculate previous period based on current time frame
  const currentPeriodStart = new Date(startDate);
  const previousPeriodStart = new Date(startDate);
  const previousPeriodEnd = new Date(startDate);
  
  switch (timeFrame) {
    case '24h':
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 1);
      break;
    case '7days':
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 7);
      break;
    case '30days':
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
      break;
    case '3months':
      previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 3);
      break;
    case '1year':
      previousPeriodStart.setFullYear(previousPeriodStart.getFullYear() - 1);
      break;
    default:
      previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
  }
  
  previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 1);
  
  // Get freelancers count for previous period
  const totalFreelancers = await prisma.freelancer.count({
    where: {
      createdAt: {
        lt: currentPeriodStart
      }
    }
  });
  
  // Get clients count for previous period
  const totalClients = await prisma.client.count({
    where: {
      createdAt: {
        lt: currentPeriodStart
      }
    }
  });
  
  // Get deliveries for previous period
  const totalDeliveries = await prisma.delivery.count({
    where: {
      createdAt: {
        gte: previousPeriodStart,
        lt: currentPeriodStart
      }
    }
  });
  
  // Get paid amount for previous period
  const paidDeliveries = await prisma.delivery.findMany({
    where: {
      PaymentStatus: 'Paid',
      createdAt: {
        gte: previousPeriodStart,
        lt: currentPeriodStart
      }
    },
    select: {
      cost: true
    }
  });
  
  const totalPaidAmount = paidDeliveries.reduce((sum, delivery) => sum + delivery.cost, 0);
  
  return {
    totalFreelancers,
    totalClients,
    totalDeliveries,
    totalPaidAmount
  };
}