import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const consumerKey = process.env.CONSUMER_KEY!;
  const consumerSecret = process.env.CONSUMER_SECRET!;

  // console.log(consumerKey, consumerSecret);
  // Choose one depending on your development environment
  // Sandbox
  const url = process.env.GENERATETOKENURL!;
  try {
    const encodedCredentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    const accessToken = res.access_token;
    console.log(accessToken);
    if (!accessToken) {
      throw new Error("No access token");
    }
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
}
