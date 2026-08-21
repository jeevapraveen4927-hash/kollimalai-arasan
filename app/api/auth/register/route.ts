import { NextResponse } from "next/server";
import { demoUsers } from "@/lib/demo-users";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, password } = body;

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = demoUsers.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account already exists with this email.",
        },
        { status: 409 }
      );
    }

    demoUsers.push({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
        user: {
          fullName: fullName.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}