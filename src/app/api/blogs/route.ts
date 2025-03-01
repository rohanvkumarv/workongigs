
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        refLinks: true
      }
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' }, 
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog
export async function POST(request) {
  try {
    const data = await request.json();
    
    const blogData = {
      title: data.title,
      bannerImage: data.bannerImage || null,
      content: '<p>Start writing your blog post...</p>',
      refLinks: {
        create: data.refLinks.map(link => ({
          title: link.title,
          url: link.url
        }))
      }
    };
    
    const blog = await db.blog.create({
      data: blogData,
      include: {
        refLinks: true
      }
    });
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' }, 
      { status: 500 }
    );
  }
}