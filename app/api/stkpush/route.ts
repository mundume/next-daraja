import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const url = process.env.STKPUSHURL!;
  const passkey = process.env.PASSKEY!;
  const timestamp = generateTimestamp();
  const shortcode = process.env.SHORTCODE;

  const stk_password = Buffer.from(
    `${shortcode}${passkey}${timestamp}`
  ).toString("base64");
  console.log(stk_password);

  const data = await req.json();
  const { amount, accessToken, phoneNumber } = data;
  console.log(amount, accessToken, phoneNumber);

  const requestBody = {
    BusinessShortCode: shortcode,
    Password: stk_password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: amount!,
    PartyA: phoneNumber!,
    PartyB: shortcode!,
    PhoneNumber: phoneNumber!,
    CallBackURL: "https://23d3-154-159-254-240.ngrok-free.app/api/callback",
    AccountReference: "account",
    TransactionDesc: "test",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log(response.statusText);
      return NextResponse.json("An error occurred", { status: 500 });
    }
    if (response.ok) {
      console.log(`hurray pleb ${response.statusText}`);
      const data = await response.json();
      console.log(data);
    }
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred", { status: 500 });
  }
}

function generateTimestamp() {
  const date = new Date();
  const timestamp = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  return timestamp;
}
