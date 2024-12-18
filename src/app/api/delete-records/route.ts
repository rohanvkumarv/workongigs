// // // import { db } from '@/lib/prisma';  // Ensure this path is correct based on your project structure

// // // // DELETE request handler to delete all records from Freelancer and OtpVerification
// // // export async function DELETE(request) {
// // //   try {
// // //     // Delete all records from Freelancer
// // //     await db.instance.deleteMany();
    
// // //     // Delete all records from OtpVerification
// // //     // await db.project.deleteMany();
    
// // //     return new Response(JSON.stringify({ message: 'All records deleted successfully' }), {
// // //       status: 200,
// // //     });
// // //   } catch (error) {
// // //     console.error('Error deleting records:', error);
// // //     return new Response(JSON.stringify({ error: 'Failed to delete records' }), {
// // //       status: 500,
// // //     });
// // //   }
// // // }
// // import { db } from '@/lib/prisma'; // Ensure this path is correct based on your project structure

// // // DELETE request handler to delete all records from Freelancer and OtpVerification
// // export async function DELETE(request: Request) {
// //   try {
// //     // Delete all records from Freelancer
// //     // await db.instance.deleteMany({}); // Pass an empty object to delete all records

// //     // Delete all records from OtpVerification (uncomment if needed)
// //     await db.project.deleteMany({}); 

// //     return new Response(JSON.stringify({ message: 'All records deleted successfully' }), {
// //       status: 200,
// //     });
// //   } catch (error: any) {
// //     console.error('Error deleting records:', error.message || error);
// //     return new Response(JSON.stringify({ error: 'Failed to delete records' }), {
// //       status: 500,
// //     });
// //   }
// // }


// import { db } from '@/lib/prisma'; // Ensure this path is correct

// export async function DELETE(request: Request) {
//   try {
//     // First, delete all `Instance` records
//     const deletedInstances = await db.instance.deleteMany({});
//     console.log('Deleted Instances:', deletedInstances);

//     // Then, delete all `Project` records
//     const deletedProjects = await db.project.deleteMany({});
//     console.log('Deleted Projects:', deletedProjects);

//     return new Response(
//       JSON.stringify({
//         message: 'All records deleted successfully',
//         deletedInstances,
//         deletedProjects,
//       }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('Error deleting records:', error.message || error);
//     return new Response(
//       JSON.stringify({
//         error: 'Failed to delete records',
//         details: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }


import { db } from '@/lib/prisma'; // Ensure this path is correct

export async function DELETE(request: Request) {
  try {
    // Step 1: Delete all `File` records
    const deletedFiles = await db.file.deleteMany({});
    console.log('Deleted Files:', deletedFiles);

    // Step 2: Delete all `Instance` records
    const deletedInstances = await db.instance.deleteMany({});
    console.log('Deleted Instances:', deletedInstances);

    // Step 3: Delete all `Project` records
    const deletedProjects = await db.project.deleteMany({});
    console.log('Deleted Projects:', deletedProjects);

    return new Response(
      JSON.stringify({
        message: 'All records deleted successfully',
        deletedFiles,
        deletedInstances,
        deletedProjects,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting records:', error.message || error);
    return new Response(
      JSON.stringify({
        error: 'Failed to delete records',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
