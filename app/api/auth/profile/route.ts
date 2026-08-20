import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Profile fetched successfully.",
    user: {
      fullName: "Test User",
      email: "test@example.com",
      phone: "9876543210",
    },
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { fullName, phone } = body;

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        fullName,
        email: "test@example.com",
        phone: phone || "",
      },
    });
  } catch (error) {
    console.error("Profile update API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}