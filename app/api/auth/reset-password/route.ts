import { NextResponse } from "next/server";
import { demoUsers } from "@/lib/demo-users";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, newPassword, confirmPassword } = body;

    if (!email || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = demoUsers.find(
      (item) => item.email === normalizedEmail
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No account found for this email.",
        },
        { status: 404 }
      );
    }

    // Update password
    user.password = newPassword;

    console.log("Password updated for:", normalizedEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}