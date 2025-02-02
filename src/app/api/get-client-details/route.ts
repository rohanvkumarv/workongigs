
// import { NextResponse } from 'next/server';
// import {db} from '@/lib/prisma';


// export async function POST(req: Request) {
//     try {
//       const { projectId } = await req.json();

//     // Verify the project belongs to the freelancer
//     const project = await db.project.findFirst({
//       where: { 
//         id: projectId,
         
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
//       return NextResponse.json({ error: 'Project not found' }, { status: 404 });
//     }

//     // Calculate total amount from active instances
//     // const totalAmount = project.instances.reduce((sum, instance) => {
//     //   if (instance.PaymentStatus === 'Paid') {
//     //     return sum + instance.cost;
//     //   }
//     //   return sum;
//     // }, 0);

//     const totalAmount = project.instances.reduce((sum, instance) => {
//       if (instance.PaymentStatus === 'Paid') {
//         return sum + (instance.cost || 0); // Add instance cost, defaulting to 0 if cost is null/undefined
//       }
//       return sum;
//     }, 0);
    
//     // Format the response
//     const formattedResponse = {
//       name: project.name,
//       paymentMode: project.modeOfPay,
//       status: project.status,
//       totalAmount,
//       files: project.instances.map(instance => ({
//         instance: instance.name,
//         desc: instance.desc,
//         date: instance.createdAt,
//         status: instance.PaymentStatus,
//         noOfFiles: instance.files.length,
//         cost: instance.cost,
//         files: instance.files.map(file => ({
//           name: file.name,
//           previewUrl: file.url
//         }))
//       }))
//     };

//     return NextResponse.json(formattedResponse);
//   } catch (error) {
//     console.error('Error fetching project details:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch project details' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
      const { clientId } = await req.json();

    // Fetch client with deliveries and their files
    const client = await db.client.findFirst({
      where: { 
        id: clientId,
      },
      include: {
        deliveries: {
          include: {
            files: true
          }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Calculate total paid amount from deliveries
    const totalAmount = client.deliveries.reduce((sum, delivery) => {
      if (delivery.PaymentStatus === 'Paid') {
        return sum + (delivery.cost || 0); // Add delivery cost, defaulting to 0 if cost is null/undefined
      }
      return sum;
    }, 0);
    
    // Format the response
    const formattedResponse = {
      id: client.id,
      name: client.name,
      modeOfPay: client.modeOfPay,
      status: client.status,
      email: client.email || null,
      phone: client.phone || null,
      totalAmount,
      deliveries: client.deliveries.map(delivery => ({
        id: delivery.id,
        name: delivery.name,
        desc: delivery.desc,
        createdAt: delivery.createdAt,
        PaymentStatus: delivery.PaymentStatus,
        cost: delivery.cost,
        files: delivery.files.map(file => ({
          name: file.name,
          url: file.url
        }))
      }))
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching client details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client details' },
      { status: 500 }
    );
  }
}