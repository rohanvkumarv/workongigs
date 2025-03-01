import { NextResponse } from 'next/server';
import {db} from '@/lib/prisma';

// GET /api/blogs/published - Get all published blogs
export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      include: {
        refLinks: true
      }
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch published blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch published blogs' }, 
      { status: 500 }
    );
  }
}