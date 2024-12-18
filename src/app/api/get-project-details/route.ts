
import { NextResponse } from 'next/server';
import {db} from '@/lib/prisma';


export async function POST(req: Request) {
    try {
      const { projectId } = await req.json();

    // Verify the project belongs to the freelancer
    const project = await db.project.findFirst({
      where: { 
        id: projectId,
         
      },
      include: {
        instances: {
          include: {
            files: true
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Calculate total amount from active instances
    // const totalAmount = project.instances.reduce((sum, instance) => {
    //   if (instance.PaymentStatus === 'Paid') {
    //     return sum + instance.cost;
    //   }
    //   return sum;
    // }, 0);

    const totalAmount = project.instances.reduce((sum, instance) => {
      if (instance.PaymentStatus === 'Paid') {
        return sum + (instance.cost || 0); // Add instance cost, defaulting to 0 if cost is null/undefined
      }
      return sum;
    }, 0);
    
    // Format the response
    const formattedResponse = {
      name: project.name,
      paymentMode: project.modeOfPay,
      status: project.status,
      totalAmount,
      files: project.instances.map(instance => ({
        instance: instance.name,
        desc: instance.desc,
        date: instance.createdAt,
        status: instance.PaymentStatus,
        noOfFiles: instance.files.length,
        cost: instance.cost,
        files: instance.files.map(file => ({
          name: file.name,
          previewUrl: file.url
        }))
      }))
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}