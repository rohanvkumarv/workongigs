// // app/api/blogs/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// // GET /api/blogs - Get all published blogs, sorted by latest first
// export async function GET(request) {
//   try {
//     // Get query parameters
//     const { searchParams } = new URL(request.url);
//     // const publishedOnly = searchParams.get('publishedOnly') !== 'false'; // Default to true
//     const limit = parseInt(searchParams.get('limit') || '50', 10);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const skip = (page - 1) * limit;

//     // Build the query
//     const query = {
//       where: {},
//       orderBy: { 
//         publishedAt: 'desc' 
//       },
//       include: {
//         refLinks: true,
//         tocItems: {
//           orderBy: {
//             level: 'asc'
//           }
//         }
//       },
//       take: limit,
//       skip: skip
//     };

//     // If publishedOnly is true, add the published filter
//     if (publishedOnly) {
//       query.where.published = true;
//       query.where.publishedAt = {
//         not: null
//       };
//     }

//     // Execute the query
//     const blogs = await db.blog.findMany(query);
    
//     // Get total count for pagination
//     const totalCount = await db.blog.count({
//       where: query.where
//     });

//     return NextResponse.json({
//       blogs,
//       pagination: {
//         total: totalCount,
//         page,
//         limit,
//         pages: Math.ceil(totalCount / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Failed to fetch blogs:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch blogs', details: error.message }, 
//       { status: 500 }
//     );
//   }
// }

// // POST /api/blogs - Create a new blog (protected route)
// export async function POST(request) {
//   try {
//     const data = await request.json();
    
//     // Handle publish action
//     const now = new Date();
//     if (data.published && !data.publishedAt) {
//       data.publishedAt = now;
//     }
    
//     // Create blog with nested relations if provided
//     const blog = await db.blog.create({
//       data: {
//         title: data.title,
//         content: data.content,
//         bannerImage: data.bannerImage,
//         published: data.published || false,
//         publishedAt: data.publishedAt,
//         refLinks: data.refLinks ? {
//           create: data.refLinks
//         } : undefined,
//         tocItems: data.tocItems ? {
//           create: data.tocItems
//         } : undefined
//       }
//     });
    
//     return NextResponse.json(blog, { status: 201 });
//   } catch (error) {
//     console.error('Failed to create blog:', error);
//     return NextResponse.json(
//       { error: 'Failed to create blog', details: error.message }, 
//       { status: 500 }
//     );
//   }
// }
// app/api/blogs/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

// GET /api/blogs - Get all published blogs, sorted by latest first
export async function GET(request) {
  try {
    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    // Build the query - only get published blogs
    const query = {
      where: {
        published: true,
        publishedAt: {
          not: null
        }
      },
      orderBy: { 
        publishedAt: 'desc' 
      },
      include: {
        refLinks: true,
        tocItems: {
          orderBy: {
            level: 'asc'
          }
        }
      },
      take: limit,
      skip: skip
    };

    // Execute the query
    const blogs = await db.blog.findMany(query);
    
    // Get total count for pagination
    const totalCount = await db.blog.count({
      where: query.where
    });

    return NextResponse.json({
      blogs,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error.message }, 
      { status: 500 }
    );
  }
}