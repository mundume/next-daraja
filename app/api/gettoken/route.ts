import { NextResponse } from "next/server";

export async function GET() {
  const consumerKey = process.env.CONSUMER_KEY!;
  const consumerSecret = process.env.CONSUMER_SECRET!;

  console.log(consumerKey, consumerSecret);
  // Choose one depending on your development environment
  // Sandbox
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const encodedCredentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");
    console.log(encodedCredentials);
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log(res);
    const accessToken = res.access_token;
    if (!accessToken) {
      throw new Error("No access token");
    }
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
}
