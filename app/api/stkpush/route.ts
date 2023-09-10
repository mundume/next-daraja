export const runtime = "edge";
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
  const { amount, accessToken } = data;
  console.log(amount, accessToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const requestBody = {
    BusinessShortCode: shortcode,
    Password: stk_password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: amount,
    PartyA: "254723080369",
    PartyB: shortcode,
    PhoneNumber: "254723080369",
    CallBackURL: "https://yourwebsite.co.ke/callbackurl",
    AccountReference: "account",
    TransactionDesc: "test",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,

      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log("youre fucked");
    }
    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json("An error occurred", { status: 500 });
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
