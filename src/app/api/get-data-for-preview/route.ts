// // app/api/get-data-for-preview/route.js
// import { db } from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { projectId } = body;
    
//     if (!projectId) {
//       return Response.json({ error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await db.project.findUnique({
//       where: {
//         id: projectId
//       },
//       include: {
//         instances: {
//           include: {
//             files: true
//           }
//         }
//       }
//     });

//     if (!project) {
//       return Response.json({ error: 'Project not found' }, { status: 404 });
//     }

//     return Response.json({ project });
//   } catch (error) {
//     console.error('Error fetching project:', error);
//     return Response.json({ error: 'Failed to fetch project data' }, { status: 500 });
//   }
// }



// // app/api/get-data-for-preview/route.js
// import { db } from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { projectId } = body;
    
//     if (!projectId) {
//       return Response.json({ error: 'Project ID is required' }, { status: 400 });
//     }

//     const project = await db.project.findUnique({
//       where: {
//         id: projectId
//       },
//       include: {
//         instances: {
//           include: {
//             files: true
//           }
//         }
//       }
//     });

//     if (!project) {
//       return Response.json({ error: 'Project not found' }, { status: 404 });
//     }

//     return Response.json({ project });
//   } catch (error) {
//     console.error('Error fetching project:', error);
//     return Response.json({ error: 'Failed to fetch project data' }, { status: 500 });
//   }
// }

// app/api/get-data-for-preview/route.js
import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse request body safely
    const body = await request.json().catch(() => ({}));
    const projectId = body?.projectId;
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' }, 
        { status: 400 }
      );
    }

    const project = await db.project.findUnique({
      where: {
        id: projectId
      },
      select: {
        id: true,
        name: true,
        modeOfPay: true,
        status: true,
        instances: {
          select: {
            id: true,
            name: true,
            desc: true,
            cost: true,
            PaymentStatus: true,
            files: {
              select: {
                id: true,
                name: true,
                url: true
              }
            }
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' }, 
        { status: 404 }
      );
    }

    // Transform data to match frontend expectations
    const transformedProject = {
      ...project,
      instances: project.instances.map(instance => ({
        ...instance,
        paymentStatus: instance.PaymentStatus, // Normalize the field name
        files: instance.files.map(file => ({
          id: file.id,
          name: file.name,
          url: file.url
        }))
      }))
    };

    return NextResponse.json({ 
      project: transformedProject 
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch project data' }, 
      { status: 500 }
    );
  }
}