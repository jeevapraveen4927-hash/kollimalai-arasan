import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required.",
        },
        { status: 400 }
      );
    }

    console.log("Verifying OTP:", email, otp);

    if (otp === "123456") {
      return NextResponse.json(
        {
          success: true,
          message: "OTP verified successfully.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid OTP. Please try again.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Verify OTP API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}