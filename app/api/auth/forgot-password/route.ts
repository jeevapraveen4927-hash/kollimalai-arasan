import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    // Temporary demo OTP
    const otp = "123456";

    console.log("OTP for", email, ":", otp);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully.",
        otp: otp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}