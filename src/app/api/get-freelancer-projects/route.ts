// import { NextResponse } from 'next/server';
// import {db } from '@/lib/prisma';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { freelancerId, status, search } = body;

//     if (!freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID is required' },
//         { status: 400 }
//       );
//     }

//     let whereClause: any = {
//       freelancerId: freelancerId
//     };
    
//     if (status && status !== 'all') {
//       whereClause = {
//         ...whereClause,
//         status: status.charAt(0).toUpperCase() + status.slice(1)
//       };
//     }

//     if (search) {
//       whereClause = {
//         ...whereClause,
//         name: { contains: search, mode: 'insensitive' }
//       };
//     }

//     const projects = await db.project.findMany({
//       where: whereClause,
//       include: {
//         instances: {
//           include: {
//             files: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     // Transform the data to include calculated fields
//     const transformedProjects = projects.map(project => {
//       const instanceCount = project.instances.length;
//       const totalCost = project.instances.reduce((sum, instance) => sum + instance.cost, 0);
      
//       // Determine project status based on instances
//       let calculatedStatus = project.status;
//       if (project.instances.some(instance => instance.status === 'Active')) {
//         calculatedStatus = 'Active';
//       }

//       return {
//         ...project,
//         instanceCount,
//         totalCost,
//         calculatedStatus
//       };
//     });

//     return NextResponse.json(transformedProjects);
//   } catch (error) {
//     console.error('Failed to fetch projects:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch projects' },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { freelancerId, status, search } = body;

//     if (!freelancerId) {
//       return NextResponse.json(
//         { error: 'Freelancer ID is required' },
//         { status: 400 }
//       );
//     }

//     let whereClause: any = {
//       freelancerId: freelancerId
//     };
    
//     if (status && status !== 'all') {
//       whereClause = {
//         ...whereClause,
//         status: status.charAt(0).toUpperCase() + status.slice(1)
//       };
//     }

//     if (search) {
//       whereClause = {
//         ...whereClause,
//         name: { contains: search, mode: 'insensitive' }
//       };
//     }

//     const projects = await db.project.findMany({
//       where: whereClause,
//       include: {
//         instances: true
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     // Transform projects with calculated fields
//     const transformedProjects = projects.map(project => {
//       // Calculate total cost from all instances
//       const totalCost = project.instances.reduce((sum, instance) => sum + instance.cost, 0);
      
//       // Count total instances
//       const instanceCount = project.instances.length;
      
//       // Check if any instance is active to determine project status
//       const isAnyInstanceActive = project.instances.some(instance => instance.status === 'Active');
//       const projectStatus = isAnyInstanceActive ? 'Active' : project.status;

//       return {
//         id: project.id,
//         name: project.name,
//         status: projectStatus,
//         createdAt: project.createdAt,
//         instanceCount,
//         totalCost,
//         modeOfPay: project.modeOfPay
//       };
//     });

//     return NextResponse.json(transformedProjects);
//   } catch (error) {
//     console.error('Failed to fetch projects:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch projects' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { freelancerId } = await req.json();

    if (!freelancerId) {
      return NextResponse.json(
        { error: 'Freelancer ID is required' },
        { status: 400 }
      );
    }

    const projects = await db.project.findMany({
      where: {
        freelancerId
      },
      include: {
        instances: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform projects with calculated fields
    const transformedProjects = projects.map(project => {
      const totalCost = project.instances.reduce((sum, instance) => sum + instance.cost, 0);
      const instanceCount = project.instances.length;
      const isAnyInstanceActive = project.instances.some(instance => instance.status === 'Active');
      const projectStatus = isAnyInstanceActive ? 'Active' : project.status;

      return {
        id: project.id,
        name: project.name,
        status: projectStatus,
        createdAt: project.createdAt,
        instanceCount,
        totalCost,
        modeOfPay: project.modeOfPay
      };
    });

    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}