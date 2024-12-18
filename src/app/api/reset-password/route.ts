// // app/api/reset-password/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     const { token, newPassword } = await request.json();

//     // Find the reset token in database
//     const resetRequest = await db.passwordReset.findUnique({
//       where: { token }
//     });

//     // Check if token exists and is not expired
//     if (!resetRequest || resetRequest.tokenExpiration < new Date()) {
//       return NextResponse.json(
//         { error: 'Invalid or expired reset token' },
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password
//     await prisma.freelancer.update({
//       where: { id: resetRequest.userId },
//       data: { password: hashedPassword }
//     });

//     // Delete the used reset token
//     await db.passwordReset.delete({
//       where: { id: resetRequest.id }
//     });

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Password has been reset successfully' 
//     });

//   } catch (error) {
//     console.error('Password reset error:', error);
//     return NextResponse.json(
//       { error: 'Failed to reset password' },
//       { status: 500 }
//     );
//   }
// }

// app/api/reset-password/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';  // Using db as imported
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Add request validation
    if (!request.body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    if (!body.token || !body.newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    const { token, newPassword } = body;

    // Find the reset token in database
    const resetRequest = await db.passwordReset.findUnique({
      where: { token }
    });

    // Check if token exists and is not expired
    if (!resetRequest) {
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    if (resetRequest.tokenExpiration < new Date()) {
      // Clean up expired token
      await db.passwordReset.delete({
        where: { id: resetRequest.id }
      });
      
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await db.freelancer.update({
      where: { id: resetRequest.userId },
      data: { password: hashedPassword }
    });

    // Delete the used reset token
    await db.passwordReset.delete({
      where: { id: resetRequest.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    // Fixed the syntax error in the error response
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}