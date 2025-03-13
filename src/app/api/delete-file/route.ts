// app/api/delete-file/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { fileId } = body;

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Find the file to get its info before deletion (optional)
    const file = await db.file.findUnique({
      where: { id: fileId }
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Delete the file from database
    await db.file.delete({
      where: { id: fileId }
    });

    // You might want to also delete the file from storage (S3, etc)
    // This would require additional integration with your storage solution
    
    return NextResponse.json({ 
      success: true, 
      message: 'File deleted successfully',
      deletedFile: file
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete file',
        details: error.message 
      },
      { status: 500 }
    );
  }
}