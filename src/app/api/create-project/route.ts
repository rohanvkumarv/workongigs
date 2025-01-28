
// app/api/create-project/route.js (move this to a separate file)
import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    const {
      projectName,
      cost,
      currency,
      paymentMode,
      description,
      freelancerId,
      files
    } = await req.json();

    // Create project
    const project = await db.project.create({
      data: {
        name: projectName,
        modeOfPay: paymentMode,
        status: 'ACTIVE',
        freelancerId,
      },
    });

    // Create instance
    const instance = await db.instance.create({
      data: {
        name: 'instance1',
        desc: description || '',
        cost: parseFloat(cost),
        PaymentStatus: "Not Paid",
        projectId: project.id,
      },
    });

    // Create file records
    const fileRecords = await Promise.all(
      files.map(file => 
        db.file.create({
          data: {
            name: file.name,
            url: file.url,
            instanceId: instance.id,
          },
        })
      )
    );

    return Response.json({ 
      success: true, 
      projectId: project.id,
      instanceId: instance.id,
      files: fileRecords
    });

  } catch (error) {
    console.error('Project creation error:', error);
    return Response.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
