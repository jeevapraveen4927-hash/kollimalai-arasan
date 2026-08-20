import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Temporary API login
    if (
      email === "test@example.com" &&
      password === "123456"
    ) {
      return NextResponse.json({
        success: true,
        message: "Login successful.",
        user: {
          email,
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password.",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}