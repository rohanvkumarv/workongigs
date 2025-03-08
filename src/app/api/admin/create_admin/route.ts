// app/api/admin/create/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// This API should be secured or disabled after initial admin creation
// You might want to add environment variable protection or another security mechanism

export async function POST(request: Request) {
  try {
    // Check if this is the first admin (for security)
    // const existingAdminsCount = await db.admin.count();
    
    // // Optional: Only allow creation if there are no admins yet
    // // Remove or modify this check if you want to allow multiple admins
    // if (existingAdminsCount > 0) {
    //   return NextResponse.json(
    //     { 
    //       success: false, 
    //       error: "Admin already exists. For security reasons, this endpoint can only be used for initial setup." 
    //     },
    //     { status: 403 }
    //   );
    // }

    const { email, password } = await request.json();
    // const { email, password, secretKey } = await request.json();

    // Optional: Add an additional layer of security with a secret key
    // This key should be stored in your environment variables
    // if (secretKey !== process.env.ADMIN_CREATION_SECRET) {
    //   return NextResponse.json(
    //     { success: false, error: "Invalid secret key" },
    //     { status: 401 }
    //   );
    // }

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingAdmin = await db.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: "Admin with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await db.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the created admin without the password
    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create admin account" },
      { status: 500 }
    );
  }
}